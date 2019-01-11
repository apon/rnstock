/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-03 16:50:51
 * @modify date 2019-01-03 16:50:51
 * @desc [description]
 */

import {
    Dimensions,
    StatusBar,
    Platform,
    StyleSheet
  } from 'react-native';
  
  const window = Dimensions.get('window');
  
  const desizeWidth = 750;
  const width = window.width;
  const height = window.height;
  /**
   * 
   */
  global.px2dp = (px) => {
    return px / desizeWidth * window.width;
  };

  export {
    width,
    height
 }