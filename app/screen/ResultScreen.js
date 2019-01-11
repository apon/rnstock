/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-11 14:48:41
 * @modify date 2019-01-11 14:48:41
 * @desc [description]
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

export default class ResultScreen extends Component{
    _onPress = () => {
        this.props.onRetryPress()
    }
    render(){
        let {type,children} = this.props;
        if(type===1){//开始获取数据
            return this._startRender();
        }else if(type==3){//获取数据失败
            return this._errorRender();
        }else if(type==2){
            return children;
        }
    }

    _startRender=()=>{
        return (
            <View style={{flex: 1,justifyContent: 'center',backgroundColor:'#ffffff'}}>
            <ActivityIndicator size="large" color="#d81e06" />
            </View>
        );
    }

    _errorRender=()=>{
        return (
            <TouchableOpacity
                style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor:'#ffffff'}}
                onPress={this._onPress}
                activeOpacity={0.8}
            >
            <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor:'#ffffff'}}>
                <Text>{`当前服务器不稳定或网络不佳(${this.props.error})`}</Text>
                <Text>{'点击重试'}</Text>
            </View>
            </TouchableOpacity>
          );
    }
}