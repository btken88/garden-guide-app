import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import PlantCard from '../components/PlantCard'

const plantsBaseURL = 'http://localhost:5000/plants/'
const varietiesBaseURL = 'http://localhost:5000/varieties/'

export default function VarietiesScreen({ route, navigation }) {
  const plantID = route.params.id

  const [plant, setPlant] = useState({})
  const [varieties, setVarieties] = useState([])

  useEffect(() => {
    fetch(plantsBaseURL + plantID)
      .then(response => response.json())
      .then(data => setPlant(data[0]))
  }, [])

  useEffect(() => {
    fetch(varietiesBaseURL + `plantId/${plantID}`)
      .then(response => response.json())
      .then(setVarieties)
  }, [])

  function varietyList() {
    return <FlatList
      data={varieties}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => {
        return <PlantCard
          name={item.commonName}
          id={item.id}
          image={item.image}
          navigation={navigation}
          location='Plant Variety' />
      }} />
  }

  return (
    <View>
      {plant.name
        ? <>
          <Text style={styles.headline}>{plant.name}</Text>
          <Image style={styles.image} source={{ uri: plant.image }} alt={plant.name} />
          <Text style={styles.description}>{plant.description}</Text>
        </>
        : null}
      {varieties.length
        ? varietyList()
        : null}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200
  },
  headline: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 8
  },
  description: {
    fontSize: 15
  }
})