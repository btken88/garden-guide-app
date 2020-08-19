import React, { useState, useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HomeScreen from './src/screens/HomeScreen'
import PlantNavContainer from './src/components/PlantNavContainer'
import TodoListScreen from './src/screens/TodoListScreen'
import AsyncStorage from '@react-native-community/async-storage'
import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import GardenNavContainer from './src/components/GardenNavContainer'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const userPlantsURL = 'http://localhost:5000/user_plants'
const userPlantsURL = 'http://garden-guide.herokuapp.com/user_plants'

export default function App() {
  const [token, setToken] = useState(false)
  const [tokenValue, setTokenValue] = useState('')
  const [userPlants, setUserPlants] = useState([])

  useEffect(() => {
    fetch(userPlantsURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      }
    }).then(response => response.json())
      .then(plants => setUserPlants(plants))
      .catch(err => alert(err.message))
  }, [tokenValue])

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          setTokenValue(token)
          setToken(true)
        } else setToken(false)
      })
      .catch(() => setToken(false))
  }, [])

  const signInNavigation = (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Sign In">
        {(params) => <SignInScreen {...params} setToken={setToken} setTokenValue={setTokenValue} />}
      </Stack.Screen>
      <Stack.Screen name="Sign Up">
        {(params) => <SignUpScreen {...params} setToken={setToken} setTokenValue={setTokenValue} />}
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
        {(props) => <HomeScreen {...props} setToken={setToken} tokenValue={tokenValue} />}
      </Tab.Screen>
      <Tab.Screen
        name="Plants"
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="leaf-maple" size={24} color='#033a07' />
        }}>
        {(props) => <PlantNavContainer
          {...props}
          tokenValue={tokenValue}
          userPlants={userPlants}
          setUserPlants={setUserPlants} />}
      </Tab.Screen>
      <Tab.Screen
        name="To Do"
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="format-list-bulleted" size={24} color='#033a07' />
        }}>
        {(props) => <TodoListScreen {...props} tokenValue={tokenValue} />}
      </Tab.Screen>
      <Tab.Screen
        name="My Garden"
        options={{
          tabBarIcon: () => <MaterialCommunityIcons name="seed" size={24} color='#033a07' />
        }}>
        {(props) => <GardenNavContainer
          {...props}
          tokenValue={tokenValue}
          userPlants={userPlants}
          setUserPlants={setUserPlants} />}
      </Tab.Screen>
    </Tab.Navigator>
  )

  return (
    <NavigationContainer>
      <StatusBar hidden={Platform.OS === 'android' ? true : false} />
      {token ? appNavigation : signInNavigation}
    </NavigationContainer>
  )
}