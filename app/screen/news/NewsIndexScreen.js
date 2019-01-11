/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-08 18:17:53
 * @modify date 2019-01-08 18:17:53
 * @desc [description]
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

import NewsScreen from './NewsScreen';

const {width:screenWidth, height:screenHeight} = Dimensions.get('window');



export default class NewsIndexScreen extends Component{

    tabArr = [
        {columnName: '体育', requestCh: 'sports'},
        {columnName: '科技', requestCh: 'tech'},
        {columnName: '娱乐', requestCh: 'ent'},
        {columnName: '教育', requestCh: 'edu'},
        {columnName: '健康', requestCh: 'health'},
        {columnName: '时尚', requestCh: 'fashion'},
        {columnName: '博客', requestCh: 'blog'}
    ];

    render(){
        return(
        <View style={styles.container}>
            <StatusBar 
                backgroundColor="#f4511e"
                androidbackgroundColor="#f4511e"
                androidtranslucent={true}
            />
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
                {
                    this.tabArr.map(item => {
                        return(
                            <NewsScreen
                                key={item.columnName}
                                tabLabel={item.columnName}
                                requestCh={item.requestCh}
                                navigation={this.props.navigation}
                            />
                        )
                    })
                }
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
        backgroundColor: '#d81e06',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 65,
        paddingTop: 25,
        paddingBottom: 5
    },
    headerLogo:{
        width:45,
        height:45,
    },
    headerSearchContainer:{
        width: screenWidth * 0.7,
        height: 33,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,.3)'
    },
    swipeItem:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },headerSearchImage:{
        width: 17,
        height: 17,
        marginRight: 5
    },
    headerSearchText:{
        color: '#F8F8F8',
    },
    headerRightImage:{
        width:27,
        height:27,
    },
    tabViewItemContainer: {
        flex: 1,
        backgroundColor: '#FFCCCC',
        justifyContent: 'center',
        alignItems: 'center'
    },
    columnSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: screenWidth* .1,
        height: 50,
        top: 0,
        right: 0,
    }
})