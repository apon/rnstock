/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-02 15:09:10
 * @modify date 2019-01-02 15:09:10
 * @desc [description]
 */

import { createStackNavigator, createAppContainer } from "react-navigation";

import IndexScreen from './screen/IndexScreen'
import SearchScreen from './screen/search/SearchScreen'
import NewsDetail from './screen/news/NewsDetail'
import StockDetailScreen from './screen/stock/StockDetailScreen'



const AppScreen = createStackNavigator({
    IndexScreen: {
        screen: IndexScreen,
        navigationOptions: {
            header: null,
        }
    },
    StockSearch:{
        screen:SearchScreen
    },
    NewsDetail:{
        screen:NewsDetail,
        navigationOptions: {
            title: '新闻',
        }
    },
    StockDetail:{
        screen:StockDetailScreen,
    }
  },{
    defaultNavigationOptions: {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
    headerMode: 'screen',

  });

  
  
  
const AppNavigator = createAppContainer(AppScreen);

export default AppNavigator;