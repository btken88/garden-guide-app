import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import GardenScreen from '../screens/GardenScreen';
import PlantScreen from '../screens/PlantScreen';

const Stack = createStackNavigator();

export default function GardenNavContainer({ tokenValue }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Garden"
        options={{ headerShown: false }}>
        {(props) => <GardenScreen tokenValue={tokenValue} {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Plant Variety"
        component={PlantScreen}
        options={({ route }) => ({ title: route.params.name })} />
    </Stack.Navigator>
  )
}
