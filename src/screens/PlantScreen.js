import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import GrowingInfo from '../components/GrowingInfo'

const varietyURL = 'https://garden-guide.herokuapp.com/varieties/'
export default function SpeciesScreen({ route }) {
  const varietyID = route.params.id

  const [plant, setPlant] = useState({})

  useEffect(() => {
    fetch(varietyURL + varietyID)
      .then(response => response.json())
      .then(data => setPlant(data[0]))
  }, [])

  function displayPlant() {
    return (
      <>
        <Text style={styles.header}>{plant.commonName}</Text>
        <Image style={styles.image} source={{ uri: plant.image }} alt={plant.commonName} />
        <Text style={styles.description}>{plant.description}</Text>
        <GrowingInfo plant={plant} />
      </>
    )
  }
  return (
    <View style={styles.fill}>
      {plant.commonName ? displayPlant() : null}
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