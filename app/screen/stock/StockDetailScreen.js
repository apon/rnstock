/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-09 00:45:42
 * @modify date 2019-01-09 00:45:42
 * @desc [个股详情]
 */
import React, { Component } from 'react';

import { StyleSheet, 
    Text, 
    View, 
    Dimensions ,
    Image,
    ScrollView
} from "react-native";

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';

const {width:screenWidth, height:screenHeight} = Dimensions.get('window');

import { connect } from 'react-redux';
import {StockActions} from './../../models/stock';


class StockDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('name', '个股详情')+'('+navigation.getParam('code', '')+')',
        };
      };

    constructor(props){
        super(props);

        this.state = {
            min: 'http://image.sinajs.cn/newchart/min/n/sz000001.gif',
            daily: 'http://image.sinajs.cn/newchart/daily/n/sz000001.gif',
            weekly: 'http://image.sinajs.cn/newchart/weekly/n/sz000001.gif',
            monthly: 'http://image.sinajs.cn/newchart/monthly/n/sz000001.gif',
        }
    }

    
    componentDidMount(){
        const { navigation } = this.props;
        code = navigation.getParam('code', 'sz000001');
        this.quotes(code);
        if(code.startsWith(6)){
            code = 'sh'+code;
        }else if(code.startsWith(0)||code.startsWith(3)){
            code = 'sz'+code;
        }
        var timestamp = '?'+Date.parse( new Date());
        min=`http://image.sinajs.cn/newchart/min/n/${code}.gif${timestamp}`;
        daily=`http://image.sinajs.cn/newchart/daily/n/${code}.gif${timestamp}`;
        weekly=`http://image.sinajs.cn/newchart/weekly/n/${code}.gif${timestamp}`;
        monthly=`http://image.sinajs.cn/newchart/monthly/n/${code}.gif${timestamp}`;
        this.setState({
            min: min,
            daily: daily,
            weekly: weekly,
            monthly: monthly,
        });
    }

    quotes=(code)=>{
        let {dispatch}= this.props;
        dispatch(StockActions.quotes({
            code:code
        }));
    }
    
    render() {
        return (
            <View style={styles.container}>
            {(this.props.type===2)&&(
                this.renderHeader(this.props.list[0])
            )}
            <ScrollableTabView
                ref={'tabView'}
                renderTabBar={() => <ScrollableTabBar style={{borderBottomWidth:0, paddingBottom:2, width:screenWidth, height:45,backgroundColor:'#f8f8f8'}} />}
                tabBarUnderlineStyle={{height:2, backgroundColor:'rgba(216,30,6,.8)'}}
                tabBarInactiveTextColor='#515151'
                tabBarActiveTextColor='#d81e06'
                tabBarTextStyle={{fontSize: 15}}
                onChangeTab={(ref) => {}}
                onScroll={(position) => {}}
                locked={false}
                initialPage={0}
            >
            <Image 
                source={{uri:this.state.min}}
                style={{width: screenWidth, height: (screenWidth/545*300)}}
                key={'分时'}
                tabLabel={'分时'}
            />
            <Image 
                source={{uri:this.state.daily}}
                style={{width: screenWidth, height: (screenWidth/545*300)}}
                key={'日K'}
                tabLabel={'日K'}
            />
            <Image 
                source={{uri:this.state.weekly}}
                style={{width: screenWidth, height: (screenWidth/545*300)}}
                key={'周K'}
                tabLabel={'周K'}
            />
            <Image 
                source={{uri:this.state.monthly}}
                style={{width: screenWidth, height: (screenWidth/545*300)}}
                key={'月K'}
                tabLabel={'月K'}
            />
                
            </ScrollableTabView>
         
            </View>
        );
    }

    renderHeader(data){
        return(
            <View style={{padding: 20}}>
                    <Text style={{fontSize: 30,color:Number(data.price)-Number(data.pre_close)>0?'#ca4a56':'#0eaa42',fontWeight:'bold'}}>{Number(data.price).toFixed(2)}</Text>
                    <View style={{flexDirection: 'row',paddingTop:5}}>
                        <Text style={{fontSize: 12,color:Number(data.price)-Number(data.pre_close)>0?'#ca4a56':'#0eaa42'}}>{(Number(data.price)-Number(data.pre_close)).toFixed(2)}</Text>
                        <Text style={{fontSize: 12,paddingLeft:5,color:Number(data.price)-Number(data.pre_close)>0?'#ca4a56':'#0eaa42'}}>{((Number(data.price)-Number(data.pre_close))/Number(data.pre_close)*100).toFixed(2)+"%"}</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop:5}}>
                        <Text style={{flex:1,fontSize: 15}}>{'今开'}</Text>
                        <Text style={{flex:1,fontSize: 15,textAlign:'right',paddingRight:10,color:'#000',fontWeight:'600'}}>{Number(data.open).toFixed(2)}</Text>
                        <Text style={{flex:1,fontSize: 15,paddingLeft:10}}>{'最高'}</Text>
                        <Text style={{flex:1,fontSize: 15,textAlign:'right',paddingRight:10,color:'#000',fontWeight:'600'}}>{Number(data.high).toFixed(2)}</Text>
                        <Text style={{flex:1,fontSize: 15,paddingLeft:10}}>{'成交量'}</Text>
                        <Text style={{flex:1,fontSize: 10,textAlign:'right',color:'#000',fontWeight:'600'}}>{(Number(data.volume)/100).toFixed(0)+'手'}</Text>
                    </View>

                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop:5}}>
                        <Text style={{flex:1,fontSize: 15}}>{'昨收'}</Text>
                        <Text style={{flex:1,fontSize: 15,textAlign:'right',paddingRight:10,color:'#000',fontWeight:'600'}}>{Number(data.pre_close).toFixed(2)}</Text>
                        <Text style={{flex:1,fontSize: 15,paddingLeft:10}}>{'最低'}</Text>
                        <Text style={{flex:1,fontSize: 15,textAlign:'right',paddingRight:10,color:'#000',fontWeight:'600'}}>{Number(data.low).toFixed(2)}</Text>
                        <Text style={{flex:1,fontSize: 15,paddingLeft:10}}>{'成交额'}</Text>
                        <Text style={{flex:1,fontSize: 10,textAlign:'right',color:'#000',fontWeight:'600'}}>{Number(data.amount).toFixed(0)}</Text>
                    </View>

                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',paddingTop:5}}>
                        <Text style={{flex:1,fontSize: 15}}>{'换手率'}</Text>
                        <Text style={{flex:1,fontSize: 15,textAlign:'right',paddingRight:10,color:'#000',fontWeight:'600'}}>{'--'}</Text>
                        <Text style={{flex:1,fontSize: 15,paddingLeft:10}}>{'市盈'}</Text>
                        <Text style={{flex:1,fontSize: 15,textAlign:'right',paddingRight:10,color:'#000',fontWeight:'600'}}>{'--'}</Text>
                        <Text style={{flex:1,fontSize: 15,paddingLeft:10}}>{'总市值'}</Text>
                        <Text style={{flex:1,fontSize: 15,textAlign:'right',color:'#000',fontWeight:'600'}}>{'--'}</Text>
                    </View>
                </View>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        list: state.quotes.data,
        type: state.quotes.type,
        error: state.quotes.error
    }
  }

export default StockDetailScreen = connect(mapStateToProps)(StockDetailScreen);


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      position: 'relative',
    }
  });