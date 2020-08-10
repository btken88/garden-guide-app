import React from 'react'
import { View, Text } from 'react-native'

export default function VarietiesScreen({ route, navigation }) {
  console.log(route.params.id)
  return (
    <View>
      <Text>Varieties info</Text>
    </View>
  )
}
