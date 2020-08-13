import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import PlantCard from '../components/PlantCard'
import { ScrollView } from 'react-native-gesture-handler'

// const plantsBaseURL = 'https://garden-guide.herokuapp.com/plants/'
// const varietiesBaseURL = 'https://garden-guide.herokuapp.com/varieties/'

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
          plant={item}
          navigation={navigation}
          location='Plant Variety' />
      }} />
  }

  return (
    <View style={{ flex: 1 }}>
      {plant.name
        ? <>
          <Text style={styles.headline}>{plant.name}</Text>
          <Image style={styles.image} source={{ uri: plant.image }} alt={plant.name} />
          <ScrollView style={styles.scroll}>
            <Text style={styles.description}>{plant.description}</Text>
          </ScrollView>
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
    height: 200,
    margin: 10,
    borderRadius: 5
  },
  headline: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 10
  },
  description: {
    fontSize: 16,
    marginHorizontal: 20
  },
  scroll: {
    marginBottom: 10
  }
})