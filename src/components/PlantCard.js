import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function PlantCard({ name, image, id, navigation, location }) {
  function viewDetails() {
    navigation.navigate(location, { id })
  }
  return (
    <TouchableOpacity onPress={viewDetails}>
      <>
        <Image source={{ uri: image }} alt={name} style={styles.image} />
        <Text style={styles.text}>{name}</Text>
      </>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 90
  },
  text: {
    textAlign: "center",
    fontSize: 18
  }
})
