/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-05 01:40:36
 * @modify date 2019-01-05 01:40:36
 * @desc [description]
 */
import { createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import {rootSaga,rootReducer} from './models/index'

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  sagaMiddleware
];

if (__DEV__) {
    middlewares.push(createLogger());
    } else {
    // 去掉console
    global.console = {
      info: () => { },
      log: () => { },
      warn: () => { },
      error: () => { },
      group: () => { },
      groupEnd: () => { },
    };
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;