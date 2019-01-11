/**
 * @author yaopeng
 * @email aponone@gmail.com
 * @create date 2019-01-02 15:17:10
 * @modify date 2019-01-02 15:17:10
 * @desc [description]
 */


import { createBottomTabNavigator} from 'react-navigation';

import HomeIndexScreen from './home/HomeIndexScreen'
import NewsIndexScreen from './news/NewsIndexScreen'


const IndexScreen = createBottomTabNavigator(
    {
      Home: {
        screen:HomeIndexScreen,
        navigationOptions: {
          header: null,
          title:"行情"
        }
      },
      News: {
        screen:NewsIndexScreen,
        navigationOptions: {
          header: null,
          title:"新闻"
        }
      },
    },
    {
      // defaultNavigationOptions: ({ navigation }) => ({
        
        // tabBarIcon: ({ focused, horizontal, tintColor }) => {
        //   const { routeName } = navigation.state;
        //   let iconName;
        //   if (routeName === 'Home') {
        //     iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        //   } else if (routeName === 'Settings') {
        //     iconName = `ios-options${focused ? '' : '-outline'}`;
        //   }
  
        //   // You can return any component that you like here! We usually use an
        //   // icon component from react-native-vector-icons
        //   return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        // },
      // }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showIcon: false,
        labelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
        tabStyle:{
          justifyContent: 'center',
          alignItems: 'center',
        }
      },
    }
  );

  export default IndexScreen;