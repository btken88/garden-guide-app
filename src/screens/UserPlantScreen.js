import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import GrowingInfo from '../components/GrowingInfo'
import PlantNotes from '../components/PlantNotes'

// const varietyURL = 'https://garden-guide.herokuapp.com/varieties/'
const varietyURL = 'http://localhost:5000/varieties/'

export default function UserPlantScreen({ route, setUserPlants, userPlants, tokenValue }) {
  const plant = route.params.plant

  return (
    <View style={styles.fill}>
      <Image style={styles.image} source={{ uri: plant.image }} alt={plant.commonName} />
      <Text style={styles.description}>{plant.description}</Text>
      <GrowingInfo plant={plant} />
      <PlantNotes setUserPlants={setUserPlants} userPlants={userPlants} tokenValue={tokenValue} plant={plant} />
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10
  },
  image: {
    height: 200,
    margin: 10,
    borderRadius: 5
  },
  description: {
    marginHorizontal: 20,
    fontSize: 16
  }
})