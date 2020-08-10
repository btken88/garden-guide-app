import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function PlantCard({ name, image, id, navigation }) {
  function viewDetails() {
    navigation.navigate('Plant Details', { id })
  }
  return (
    <TouchableOpacity onPress={viewDetails}>
      <>
        <Image source={image} alt={name} style={styles.image} />
        <Text>{name}</Text>
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 90
  },
})
