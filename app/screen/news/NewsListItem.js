/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-08 19:58:24
 * @modify date 2019-01-08 19:58:24
 * @desc [description]
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default class NewsListItem extends Component{

    _onPress = () => {
        this.props.onPressItem(this.props.item)
    }

    render(){
        let item = this.props.item;
        return(
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
                style={styles.item}
                activeOpacity={0.8}
            >
                <View style={{width:screenWidth*0.63, height:80, justifyContent:'space-between'}} >
                    <Text style={{fontSize:16, lineHeight:25, color:'#2c2c2c'}}>{item.title}</Text>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginRight:6}}>{item.source}</Text>
                                <Text style={{marginRight:6}}>{item.comment}评论</Text>
                            </View>

                            {/*这里应该有个X号*/}
                        </View>
                </View>

                <Image source={{uri:item.img}} style={{width:screenWidth*0.3, height:80}} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7,
    }
})