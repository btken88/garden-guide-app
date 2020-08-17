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
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#f5f5f5',
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: -1 },
    shadowRadius: 3,
    elevation: 1.5
  },
  image: {
    height: 100,
    marginBottom: 3,
    borderRadius: 5
  },
  text: {
    textAlign: "center",
    fontSize: 18
  }
})
