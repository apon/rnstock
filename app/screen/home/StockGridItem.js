/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-09 17:32:31
 * @modify date 2019-01-09 17:32:31
 * @desc [description]
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class StockGridItem extends Component{
    _onPress = () => {
        this.props.onPressItem(this.props.item)
    }

    render(){
        let item = this.props.item;
        let change = Number(item.change);
        return(
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
                // style={styles.item}
                activeOpacity={0.8}
            >
                <View style={[styles.itemContainer, { backgroundColor: change>0?'#fdf7f4':'#f5fbf4' }]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={[styles.itemCode,{color:change>0?'#ca4a56':'#0eaa42'}]}>{Number(item.close).toFixed(2)}</Text>
                    <View style ={{flexDirection: 'row'}}>
                        <Text style={[styles.itemChange,{color:change>0?'#ca4a56':'#0eaa42'}]}>{(change>0?'+':'')+(Number(item.close)-Number(item.preclose)).toFixed(2)}</Text>
                        <Text style={[styles.itemChange,{color:change>0?'#ca4a56':'#0eaa42'}]}>{(change>0?'+':'')+item.change+'%'}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
        }
}

const styles = StyleSheet.create({
    gridView: {
      paddingTop: 25,
      paddingBottom: 50,
      flex: 1,
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
      color: '#37312e',
      fontWeight: '600',
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 16,
      color: '#fff',
      justifyContent: 'center',
      padding: 3,
    },
    itemChange: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
        justifyContent: 'center',
        padding: 3,
      },
  });