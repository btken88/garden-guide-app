import React, { useState, useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import PlantNavContainer from './src/components/PlantNavContainer'
import TodoListScreen from './src/screens/TodoListScreen'
import GardenScreen from './src/screens/GardenScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-community/async-storage'
import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => token ? setToken(true) : setToken(false))
      .catch(() => setToken(false))
  }, [])

  const signInNavigation = (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Sign In">
        {(params) => <SignInScreen {...params} setToken={setToken} />}
      </Stack.Screen>
      <Stack.Screen name="Sign Up">
        {(params) => <SignUpScreen {...params} setToken={setToken} />}
      </Stack.Screen>
    </Stack.Navigator>
  )

  const appNavigation = (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="home" size={24} color='#033a07' />,
          activeTintColor: '#033A07'
        }}>
        {(props) => <HomeScreen {...props} setToken={setToken} />}</Tab.Screen>
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
  )

  return (
    <NavigationContainer>
      <StatusBar hidden={Platform.OS === 'android' ? true : false} />
      {token ? appNavigation : signInNavigation}
    </NavigationContainer>
  )
}