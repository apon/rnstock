/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-05 00:03:59
 * @modify date 2019-01-05 00:03:59
 * @desc [description]
 */

import { handleActions } from 'redux-actions';
import {BuildApi} from './../api/ApiBuilder'

const apiConfigs = {
    index: {
        path: 'index',
        method: 'get'
    },
    search: {
        path: 'search',
        method: 'get'
    },
    time: {
        path: 'time',
        method: 'get'
    },
    quotes: {
        path: 'quotes',
        method: 'get'
    },
    kdata: {
        path: 'kdata',
        method: 'get'
    },
    quotechange: {
        path: 'quotechange',
        method: 'get'
    },
    turnoverratio: {
        path: 'turnoverratio',
        method: 'get'
    },
}

const api = BuildApi(apiConfigs);

export const StockActionNames = api.apiActionNames;
export const StockActions = api.apiActions;
export const StockSagas = [
  ...api.sagas
];

const SearchReducer = handleActions({
    [StockActionNames.search.request](state, action) {
        let type = {type: 1};
        return { 
            ...state,
            ...type
        };
    },
    [StockActionNames.search.success](state, action) {
        let arr = [];
        if (action.payload.res && action.payload.res.length > 0) arr = action.payload.res;
        return { 
            data: arr,
            type: 2
        };
    },
    [StockActionNames.search.error](state, action) {
        let type = {type: 3,error: action.payload.res.des};
        return { 
            ...state,
            ...type,
        };
    },
    }, {
        type:0,
        error:''
    }
);

const IndexReducer = handleActions({
    [StockActionNames.index.request](state, action) {
        let type = {type: 1};
        return { 
            ...state,
            ...type
        };
    },
    [StockActionNames.index.success](state, action) {
        let arr = [];
        if (action.payload.res && action.payload.res.length > 0) arr = action.payload.res;
        return { 
            data: arr,
            type: 2
        };
    },
    [StockActionNames.index.error](state, action) {
        let type = {type: 3,error: action.payload.res.des};
        return { 
            ...state,
            ...type,
        };
    },
    }, {
        data:[],
        type:1,
        error:''
    }
);

const  quotesReducer = handleActions({
    [StockActionNames.quotes.request](state, action) {
        let type = {type: 1};
        return { 
            ...state,
            ...type
        };
    },
    [StockActionNames.quotes.success](state, action) {
        let arr = [];
        if (action.payload.res && action.payload.res.length > 0) arr = action.payload.res;
        return { 
            data: arr,
            type: 2
        };
    },
    [StockActionNames.quotes.error](state, action) {
        let type = {type: 3,error: action.payload.res.des};
        return { 
            ...state,
            ...type,
        };
    },
    }, {
    type:1,
    error:''
});

const quoteChangeReducer = handleActions({
    [StockActionNames.quotechange.request](state, action) {
        let type = {type: 1};
        return { 
            ...state,
            ...type
        };
    },
    [StockActionNames.quotechange.success](state, action) {
        let type = {type: 2};
        arr = action.payload.res;
        var qtype = action.payload.req.type;
        data={};
        data['data'+qtype] = arr;
        return { 
            ...state,
            ...type,
            ...data
        };
       
    },
    [StockActionNames.quotechange.error](state, action) {
        let type = {type: 3,error: action.payload.res.des};
        return { 
            ...state,
            ...type,
        };
    },
    }, {
        data1:[],
        data0:[],
        type:1,
        error:''
    }
);
const turnoverratioReducer = handleActions({
    [StockActionNames.turnoverratio.request](state, action) {
        let arr = [];
        if (action.payload.res && action.payload.res.length > 0) arr = action.payload.res;
        return { 
            data: arr,
            type: 1
        };
    },
    [StockActionNames.turnoverratio.success](state, action) {
        let arr = [];
        if (action.payload.res && action.payload.res.length > 0) arr = action.payload.res;
        return { 
            data: arr,
            type: 2
        };
    },
    [StockActionNames.turnoverratio.error](state, action) {
        let arr = [];
        if (action.payload.res && action.payload.res.length > 0) arr = action.payload.res;
        return { 
            data: arr,
            type: 3,
            error: action.payload.res.des
        };
    },
    }, {
    type:1,
    error:''
});


export const StockReducers = {
    stockSearch: SearchReducer,
    stockIndex: IndexReducer,
    quoteChange: quoteChangeReducer,
    quotes: quotesReducer,
    turnoverratio: turnoverratioReducer,
};