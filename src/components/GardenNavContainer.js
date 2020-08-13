import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import GardenScreen from '../screens/GardenScreen';
import UserPlantScreen from '../screens/UserPlantScreen';

const Stack = createStackNavigator();

export default function GardenNavContainer({ tokenValue, userPlants, setUserPlants }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Garden"
        options={{ headerShown: false }}>
        {(props) => <GardenScreen
          {...props}
          tokenValue={tokenValue}
          userPlants={userPlants} />}
      </Stack.Screen>
      <Stack.Screen
        name="Plant Variety"
        options={({ route }) => ({ title: route.params.name })}>
        {(props) => <UserPlantScreen {...props}
          plants={userPlants}
          setUserPlants={setUserPlants}
          tokenValue={tokenValue} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
