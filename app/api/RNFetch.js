/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-04 22:36:57
 * @modify date 2019-01-04 22:36:57
 * @desc [description]
 */

import HttpConfig from './../config/HttpConfig'

URL = HttpConfig.API_URL;

function parseJSON(response) {
  return response.json();
}

/**
 * 网络状态返回非200会reject
 * @param response
 */
function checkStatus(response) {
  if (response.status / 200 !== 1) {
    return Promise.reject({
      des: `网络错误:${response.status}`,
    });
  }
  return response;
}

/**
 * Requests a URL, returning a promise.
 * @param {string} url
 * @param {Object} options
 * @returns promise
 */
function RNFetch(path, options,url = '') {
  const opts = { ...options };

  opts.headers = {
    'Accept': 'application/json',
    ...opts.headers,
  };
  if(url !== ''){
    URL = url;
  }else{
    URL = HttpConfig.API_URL;
  }

  const _URL = `${URL}/${path}`;

  if (__DEV__ && console.group) {
    console.group(`%c 网络请求`, 'color: blue; font-weight: lighter;');
    console.log('请求链接：', _URL);
    console.log('请求参数：', opts);
    console.groupEnd();
  }

  return Promise.race([
    fetch(_URL, opts)
      .then(checkStatus)
      .then(parseJSON),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ des: '网络超时' });
      }, HttpConfig.NET_TIMEOUT);
    }),
  ]);
}

export default RNFetch;
