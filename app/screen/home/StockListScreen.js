/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-10 14:42:10
 * @modify date 2019-01-10 14:42:10
 * @desc [description]
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {StockActions} from './../../models/stock';
import ResultScreen from './../ResultScreen';

class StockListScreen extends Component{

    componentDidMount() {
        let {requestType}= this.props;
        if(requestType===0){
            this.quoteChange(0);
        }else if(requestType===1){
            this.quoteChange(1);
        }else if(requestType===2){
            this.turnoverratio();
        }
        
    }
    quoteChange=(type)=>{
        let {dispatch}= this.props;
        dispatch(StockActions.quotechange({
            type:type,
            num:20
        }));
    }
    turnoverratio=()=>{
        let {dispatch}= this.props;
        dispatch(StockActions.turnoverratio({
            num:20
        }));
    }
    render() {
        let {requestType,type,type2,error,error2}= this.props;
        if(requestType===2){
            type = type2;
        }
        return(
            <View style={{flex: 1,backgroundColor:'#ffffff'}}>
                <StatusBar 
                backgroundColor="#f4511e"
                androidbackgroundColor="#f4511e"
                androidtranslucent={true}
                />
                <View style={{height:1,backgroundColor:'#f8f8f8'}}/>
                <View style={{ justifyContent: 'center',alignItems: 'center',flexDirection: 'row',padding:5,backgroundColor:'#fff',paddingLeft:10,paddingRight:10}}>
                    <Text style={{flex:2}}>{'股票名称'}</Text>
                    <Text style={{flex:1}}>{'最新价'}</Text>
                    <Text style={{flex:1,textAlign:'right'}}>{requestType===2?'换手率':'涨跌幅'}</Text>
                </View>
                <View style={{height:1,backgroundColor:'#f8f8f8'}}/>

                 <ResultScreen
                    type = {type}
                    error = {requestType===2?error2:error}
                    onRetryPress = {requestType===2?this.turnoverratio:this.quoteChange}
                    >
                    {this.successRender()}
                </ResultScreen>

            </View>
        )
       
       
    }

    
    successRender=()=>{
        let {requestType}= this.props;
        return (
            <FlatList
                data={requestType===2?this.props.list2:this.props.list['data'+requestType]}
                keyExtractor={(item, index) => index.toString()} 
                renderItem={({item}) => 
                    <StockListItem
                        requestType = {requestType}
                        item = {item}
                        onPressItem = {item=>{
                            this.props.navigation.navigate('StockDetail',item);
                        }}
                    />
                }
            />
          )
    }
    
}

class StockListItem extends Component{
    _onPress = () => {
        this.props.onPressItem(this.props.item)
    }
    render(){
        let {item,requestType} = this.props;
        return (
            <TouchableOpacity
                onPress={this._onPress}
                activeOpacity={0.8}
            >
            <View style={styles.listView}>
                <View style={{flex:2}}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCode}>{item.code}</Text>
                </View>
                <Text style={styles.itemTrade}>{Number(item.trade).toFixed(2)}</Text>
                <Text style={[styles.itemChange,{color:requestType===0?'#ca4a56':'#0eaa42'}]}>{(requestType===2?Number(item.turnoverratio).toFixed(2):Number(item.changepercent).toFixed(2))+"%"}</Text>
            </View>
        </TouchableOpacity>
    )}
}

const mapStateToProps = (state) => {
    return {
        list2:state.turnoverratio.data,
        type2: state.turnoverratio.type,
        error2: state.turnoverratio.error,
        list: state.quoteChange,
        type: state.quoteChange.type,
        error: state.quoteChange.error
    }
  }

export default StockListScreen = connect(mapStateToProps)(StockListScreen);

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
   
    listView: {
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        flexDirection: 'row',
        padding:10,
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      padding: 10,
      height: 100,
    },
    itemName: {
      fontSize: 14,
      color: '#000000',
      fontWeight: '600',
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 10,
      justifyContent: 'center',
      padding: 3,
    },
    itemTrade:{
        fontWeight: '600',
        fontSize: 16,
        color: '#000',
        padding: 3,
        flex:1,
    },
    itemChange: {
        fontWeight: '600',
        fontSize: 16,
        color: '#000',
        padding: 3,
        flex:1,
        textAlign:'right'
      },
  })
