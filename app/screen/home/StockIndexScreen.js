/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-02 16:42:14
 * @modify date 2019-01-02 16:42:14
 * @desc [国内指数]
 */
import React, {Component} from 'react';
import {
  View,
  StatusBar,
  StyleSheet
} from 'react-native';
import GridView from 'react-native-super-grid';
import StockGridItem from './../home/StockGridItem';
import ResultScreen from './../ResultScreen';
import { connect } from 'react-redux';
import {StockActions} from './../../models/stock';


class StockIndexScreen extends Component{

    componentDidMount() {
        this.getIndex();
    }
    getIndex=()=>{
        let {dispatch}= this.props;
        dispatch(StockActions.index({}));
    }
    render() {
        let {type,error} =this.props;

        return(
            <View style={{flex: 1,backgroundColor:'#ffffff'}}>
                <StatusBar 
                backgroundColor="#f4511e"
                androidbackgroundColor="#f4511e"
                androidtranslucent={true}
                />
                <ResultScreen
                    type = {type}
                    error = {error}
                    onRetryPress = {this.getIndex}
                >
                    {this.successRender()}
                </ResultScreen>
            </View>
        )
       
    }

    
    successRender=()=>{
        
        return (
            <GridView
                    itemDimension={100}
                    items={this.props.list}
                    style={styles.gridView}
                    renderItem={item => (
                        <StockGridItem 
                        item={item}
                        onPressItem={item=>{
                            this.props.navigation.navigate('StockSearch');
                        }}
                        />
                    )}
                />
        )
    }
   
}

const mapStateToProps = (state) => {
    return {
      list: state.stockIndex.data,
      type: state.stockIndex.type,
      error: state.stockIndex.error
    }
  }

export default StockIndexScreen = connect(mapStateToProps)(StockIndexScreen);

const styles = StyleSheet.create({
    gridView: {
      paddingTop: 15,
      paddingBottom: 200,
      flex: 1,
    }
});

