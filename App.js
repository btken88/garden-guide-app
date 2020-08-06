import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import PlantListScreen from './src/screens/PlantListScreen'
import SeedVaultScreen from './src/screens/SeedVaultScreen'
import GardenScreen from './src/screens/GardenScreen'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Plants" component={PlantListScreen} />
        <Tab.Screen name="Seed Vault" component={SeedVaultScreen} />
        <Tab.Screen name="My Garden" component={GardenScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}