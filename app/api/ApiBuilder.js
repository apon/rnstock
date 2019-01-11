/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-04 23:34:58
 * @modify date 2019-01-04 23:34:58
 * @desc [description]
 */
import { createAction} from 'redux-actions';
import { call, put, take } from 'redux-saga/effects';
import {
  DeviceEventEmitter,
} from 'react-native';
import querystring from 'querystring';
import RNFetch from './RNFetch';

function createActionNames(method,path){
    return {
      request: `${method}:${path}/request`,
      success: `${method}:${path}/success`,
      error: `${method}:${path}/error`,
    };
}


function createRequest(method, path,url = '') {
    return async (data = {}) => {
      let _method = method ? method.toUpperCase() : 'POST';
      let _path = path;

      // fetch请求的options
      let opts = {
        method: _method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // 请求url
      // let _url =  _path;
  
      if (_method === 'GET') {
        _path = `${_path}?${querystring.stringify(data)}`;
      } else if (data) {
        opts.body = data ? JSON.stringify(data) : null;
      }
      const res = await RNFetch(_path, opts,url);
      return res;
    };
  }

  function createEffect(request, actionNames) {
    return function* api_request() {
      while (true) {
        const req = yield take(actionNames.request);
        const payload = req.payload || {};
        const { hideLoading, except, ...rest } = payload;
        
        try {
          const response = yield call(request, rest);
  
          if (__DEV__ && console.group) {
            console.group(`%c 网络请求成功 ${actionNames.request}`, 'color: blue; font-weight: lighter;');
            console.log('返回数据：', response);
            console.groupEnd();
          }

            yield put(createAction(actionNames.success)({
                req: req.payload || null,
                res: response,
            }));
            DeviceEventEmitter.emit(actionNames.success, { req: req.payload, res: response });
          
        } catch (error) {
  
          if (__DEV__ && console.group) {
            console.group(`%c网络请求失败 ${req.payload}`, 'color: red; font-weight: lighter;');
            console.log('错误信息：', error);
            console.groupEnd();
          }
  
          let errorMessage = '未知错误';
          if (error.des) {
            errorMessage = error.des;
          } else if (typeof error === 'string') {
            errorMessage = error;
          }
          DeviceEventEmitter.emit(actionNames.error, { req: req.payload, res: { des: errorMessage } });
          yield put(createAction(actionNames.error)({
            req: req.payload || null,
            res: { des: errorMessage }
          }));
        }
        
      }
    };
  }

  export function BuildApi(apiConfigs,url = ''){
    const apiActionNames = {};
    const apiActions = {};
    const sagas = [];
    Object.keys(apiConfigs).forEach(key => {
      const { path, method } = apiConfigs[key];
      apiActionNames[key] = {};
      apiActions[key] = {};
      let actionNames = createActionNames(method, path);
      apiActionNames[key] = actionNames;
      apiActions[key] = createAction(actionNames.request);
      let request = createRequest(method, path,url);
      const effect = createEffect(request, actionNames);
      sagas.push(effect);
    });
    return {
      apiActionNames,
      apiActions,
      sagas,
    };
  }

  