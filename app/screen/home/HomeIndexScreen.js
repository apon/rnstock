/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-09 16:22:47
 * @modify date 2019-01-09 16:22:47
 * @desc [description]
 */

import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import StockIndexScreen from './StockIndexScreen';
import StockListScreen from './StockListScreen';
const {width:screenWidth, height:screenHeight} = Dimensions.get('window');


export default class HomeIndexScreen extends Component{

   

    render(){
        return(
        <View style={styles.container}>
            <StatusBar 
                backgroundColor="#f4511e"
                androidbackgroundColor="#f4511e"
                androidtranslucent={true}
            />

            {/* 头部 */}
            <View style={styles.headerContainer}>

                <Image  style={styles.headerLogo} />
                <TouchableOpacity activeOpacity={1} onPress={() => 
                    this.props.navigation.push('StockSearch')
                    }>
                <View style={styles.headerSearchContainer}>
                    <Image source={require('./../../assets/images/i_search.png')} 
                    style={{width:20,
                    height:20}}/>
                    <Text style={{color:'#fff',paddingLeft:10}}>{'输入股票代码'}</Text>
                </View>
                </TouchableOpacity>
                <Image  style={styles.headerLogo} />

            </View>


            <ScrollableTabView
                ref={'tabView'}
                renderTabBar={() => <ScrollableTabBar style={{borderBottomWidth:0, paddingBottom:2, width:screenWidth, height:45}} />}
                tabBarUnderlineStyle={{height:2, backgroundColor:'rgba(216,30,6,.8)'}}
                tabBarInactiveTextColor='#515151'
                tabBarActiveTextColor='#d81e06'
                tabBarTextStyle={{fontSize: 15}}
                onChangeTab={(ref) => {}}
                onScroll={(position) => {}}
                locked={false}
                initialPage={0}
            >
            <StockIndexScreen
                tabLabel={'国内指数'}
                navigation={this.props.navigation}
            />
            <StockListScreen
                tabLabel={'涨幅榜'}
                requestType={0}
                navigation={this.props.navigation}
            />
            <StockListScreen
                tabLabel={'跌幅榜'}
                requestType={1}
                navigation={this.props.navigation}
            />
            <StockListScreen
                tabLabel={'换手率榜'}
                requestType={2}
                navigation={this.props.navigation}
            />
            </ScrollableTabView>
        </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F8F8F8',
        position: 'relative',
    },
 
    headerContainer:{
        flexDirection: 'row',
        backgroundColor: '#f4511e',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 55,
    },
    headerLogo:{
        width:45,
        height:45,
    },
    headerSearchContainer:{
        width: screenWidth * 0.7,
        height: 33,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,.3)',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10
    },
    
})