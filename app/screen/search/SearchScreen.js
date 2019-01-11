/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-03 18:15:24
 * @modify date 2019-01-03 18:15:24
 * @desc [description]
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import {StockActions} from './../../models/stock'
const {width:screenWidth, height:screenHeight} = Dimensions.get('window');

class SearchScreen extends Component{

  static navigationOptions = {
    title: 'Search',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  search = (key) => {
    let {dispatch} = this.props;
    dispatch(StockActions.search({
      key: key.text,
    }));
  }

  render() {
    let {list,dispatch,navigation} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar 
            backgroundColor="#f4511e"
            androidbackgroundColor="#f4511e"
            androidtranslucent={true}
          />
        {/* 头部 */}
        <View style={styles.headerContainer}>

          <Image  style={styles.headerLogo} />
          
          <View style={styles.headerSearchContainer}>
              <Image source={require('./../../assets/images/i_search.png')} 
              style={{width:20,
              height:20}}/>
              <TextInput
                style={{color:'#fff',padding:0,width:screenWidth * 0.6}}
                onChangeText={(text) => this.search({text})}
                // value={this.state.text}
                underlineColorAndroid={"transparent"}
              />
          </View>
          <TouchableOpacity activeOpacity={1} onPress={()=>{
            // this.props.navigation.dispatch(NavigationActions.back({
            //   key: null
            // }))
            console.log('取消')
            this.props.navigation.goBack()
          }}>
            <Text  style={{color:'#fff',width:45,fontWeight: '600',fontSize: 16}} >{'取消'}</Text>
          </TouchableOpacity>
        </View>
        
        
        {this.props.type===2&&(
          <FlatList
              data={list}
              keyExtractor={(item, index) => index.toString()} 
              renderItem={({item}) => 
                  <StockListItem
                      item = {item}
                      onPressItem = {item=>{
                          this.props.navigation.navigate('StockDetail',item);
                      }}
                  />
              }
          />
        )}
        
        {this.props.type===1&&(
                <View style={{flex: 1,justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#f4511e" />
                </View>)
            
        }
      </View>
    );
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
              <Text style={styles.itemTrade}></Text>
              <Text style={[styles.itemChange,{color:requestType===0?'#ca4a56':'#0eaa42'}]}>{'添加'}</Text>
          </View>
      </TouchableOpacity>
  )}
}

const mapStateToProps = (state) => {
  return {
    list: state.stockSearch.data,
    type: state.stockSearch.type
  }
}

export default SearchScreen = connect(mapStateToProps)(SearchScreen);
// export default withNavigation(SearchScreen);

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