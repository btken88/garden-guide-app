import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { AppLoading } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import PlantNavContainer from './src/components/PlantNavContainer'
import TodoListScreen from './src/screens/TodoListScreen'
import GardenScreen from './src/screens/GardenScreen'

const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <StatusBar hidden={Platform.OS === 'android' ? true : false} />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Plants" component={PlantNavContainer} />
        <Tab.Screen name="To Do" component={TodoListScreen} />
        <Tab.Screen name="My Garden" component={GardenScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}