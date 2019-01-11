/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-08 17:13:27
 * @modify date 2019-01-08 17:13:27
 * @desc [description]
 */
import { handleActions } from 'redux-actions';
import {BuildApi} from './../api/ApiBuilder'

const apiConfigs = {
    sinanews: {
        path: 'ent/feed.d.json',
        method: 'get'
    },
}

const BaseUrl = 'https://interface.sina.cn';

const api = BuildApi(apiConfigs,BaseUrl);

export const NewsActionNames = api.apiActionNames;
export const NewsActions = api.apiActions;
export const NewsSagas = [
  ...api.sagas
];




const NewsListReducers = handleActions({
    [NewsActionNames.sinanews.request](state, action) {
        let type = {type: 1};
        return { 
            ...state,
            ...type
        };
    },
    [NewsActionNames.sinanews.success](state, action) {
        let type = {type: 2};
        if (action.payload.res.status && action.payload.res.status === 1){
            arr = action.payload.res.data;
            var ch = action.payload.req.ch;
            data={};
            data[ch] = arr;
            return { 
                ...state,
                ...type,
                ...data
            };
        }else{
            let type = {type: 3,error: action.payload.res.message};
            return { 
                ...state,
                ...type,
            };
        }
        
    },
    [NewsActionNames.sinanews.error](state, action) {
        let type = {type: 3,error: action.payload.res.des};
        return { 
            ...state,
            ...type,
        };
    },
    }, {
        type:1,
        error:''
    }
);

export const NewsReducers = {
    newsList: NewsListReducers,
};