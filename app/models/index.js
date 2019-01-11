/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-05 00:21:26
 * @modify date 2019-01-05 00:21:26
 * @desc [description]
 */
import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import {StockSagas,StockReducers} from './stock'
import {NewsSagas,NewsReducers} from './news'
const sagas = [
    ...StockSagas,
    ...NewsSagas
  ];
  
export function* rootSaga() {
    for (let item of sagas) {
      yield fork(item);
    }
  }
  
const appReducer = combineReducers({
...StockReducers,
...NewsReducers
});
  
export const rootReducer = (state, action) => {
    return appReducer(state, action);
};