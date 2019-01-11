/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-02 14:53:52
 * @modify date 2019-01-02 14:53:52
 * @desc [description]
 */


import React, {Component} from 'react';
import {
  StatusBar,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';
import store from './app/store';
import AppNavigator from './app/AppNavigator';

export default class App extends Component {

  componentDidMount() {
    codePush.sync();
  }

  render() {
    return (
      <Provider store={store}>
      <AppNavigator>
        <View style={{ flex: 1 }}>
          <StatusBar 
            backgroundColor="blue"
            androidbackgroundColor="blue"
          />
        </View>     

      </AppNavigator>
      </Provider>
    );
  }
}