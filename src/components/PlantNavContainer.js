import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PlantListScreen from '../screens/PlantListScreen';
import VarietiesScreen from '../screens/VarietiesScreen';
import PlantScreen from '../screens/PlantScreen';

const Stack = createStackNavigator();

export default function PlantNavContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Plant List"
        component={PlantListScreen} />
      <Stack.Screen
        name="Plant Details"
        component={VarietiesScreen} />
      <Stack.Screen
        name="Plant Variety"
        component={PlantScreen}
        options={({ route }) => ({ title: route.params.name })} />
    </Stack.Navigator>
  )
}
