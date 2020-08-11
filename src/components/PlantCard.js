import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function PlantCard({ name, image, id, navigation, location }) {
  function viewDetails() {
    navigation.navigate(location, { id, name })
  }
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={viewDetails}>
        <Image source={{ uri: image }} alt={name} style={styles.image} />
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  image: {
    height: 100,
    marginHorizontal: 10,
    marginBottom: 3,
    borderRadius: 5
  },
  text: {
    textAlign: "center",
    fontSize: 18
  }
})
