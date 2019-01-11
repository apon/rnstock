/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-08 17:45:47
 * @modify date 2019-01-08 17:45:47
 * @desc [description]
 */
import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {NewsActions} from './../../models/news';

import NewsListItem from './NewsListItem';
import ResultScreen from './../ResultScreen';

class NewsScreen extends Component{

    componentDidMount() {
        this.getNews();
    }
    getNews=()=>{
        let {dispatch,requestCh}= this.props;

        dispatch(NewsActions.sinanews({
            ch:requestCh
        }));
    }
    render() {
        let {type,error} =this.props;
        return(
            <ResultScreen
                type = {type}
                error = {error}
                onRetryPress = {this.getNews}
            >
                {this.successRender()}
            </ResultScreen>
        )
        
       
    }

    successRender=()=>{
        let {data,requestCh} = this.props;
        return(
            <View style={styles.container}>
                <FlatList 
                    ref={ref => this.flatList = ref}
                    data={data[requestCh]}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderItemSeparatorComponent}
                />
            </View>
        );
    }
 

    renderItem = ({item}) => {
        return(
            <NewsListItem 
                item={item}
                onPressItem={this.onPressItem}
            />
        )
    }

    onPressItem = (item) => {
        this.props.navigation.push('NewsDetail', {...item})
    }

    keyExtractor = (item, index) => index + '';

    renderItemSeparatorComponent = ({highlighted}) => {
        return(
            <View style={{height:1, backgroundColor:'#e6e6e6'}}></View>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        data: state.newsList,
        type: state.newsList.type,
        error: state.newsList.error
    }
  }
export default NewsScreen = connect(mapStateToProps)(NewsScreen);


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7,
    },
    picItem:{
        padding: 7,
    }
})