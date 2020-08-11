import React from 'react'
import { Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import PlantNavContainer from './src/components/PlantNavContainer'
import TodoListScreen from './src/screens/TodoListScreen'
import GardenScreen from './src/screens/GardenScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <StatusBar hidden={Platform.OS === 'android' ? true : false} />
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons name="home" size={24} color='#033a07' />,
            activeTintColor: '#033A07'
          }}
        />
        <Tab.Screen
          name="Plants"
          component={PlantNavContainer}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons name="leaf-maple" size={24} color='#033a07' />
          }}
        />
        <Tab.Screen
          name="To Do"
          component={TodoListScreen}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons name="format-list-bulleted" size={24} color='#033a07' />
          }}
        />
        <Tab.Screen
          name="My Garden"
          component={GardenScreen}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons name="seed" size={24} color='#033a07' />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}