import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function PlantCard({ plant, navigation, location }) {
  function viewDetails() {
    navigation.navigate(location, { id: plant.id, name: plant.name || plant.commonName, plant })
  }
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={viewDetails}>
        <Image source={{ uri: plant.image }} alt={plant.name || plant.commonName} style={styles.image} />
        <Text style={styles.text}>{plant.name || plant.commonName}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 5,
    flex: 1,
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
