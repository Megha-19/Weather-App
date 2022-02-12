import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Home from './src/screens/Home'
import Search from './src/screens/Search'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

const navigator = createBottomTabNavigator(
  {
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: <FontAwesome5 name="search" size={30} color="white" />,
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: (
          <MaterialCommunityIcons
            name="weather-cloudy"
            size={45}
            color="white"
          />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'blue',
      showLabel: false,
      activeBackgroundColor: '#1864ab',
      style: {
        backgroundColor: '#339af0',
      },
    },
  },
)

export default createAppContainer(navigator)
