import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import PlantListScreen from '../screens/PlantListScreen';
import VarietiesScreen from '../screens/VarietiesScreen';
import PlantScreen from '../screens/PlantScreen';

const Stack = createStackNavigator();

export default function PlantNavContainer({ userPlants, setUserPlants, tokenValue }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Plant List"
        component={PlantListScreen}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="Plant Details"
        component={VarietiesScreen} />
      <Stack.Screen
        name="Plant Variety"
        options={({ route }) => ({ title: route.params.name })}>
        {(props) => <PlantScreen
          {...props}
          userPlants={userPlants}
          setUserPlants={setUserPlants}
          tokenValue={tokenValue} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}
