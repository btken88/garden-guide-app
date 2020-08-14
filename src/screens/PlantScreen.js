import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import GrowingInfo from '../components/GrowingInfo'

// const varietyURL = 'https://garden-guide.herokuapp.com/varieties/'
const varietyURL = 'http://localhost:5000/varieties/'
const userPlantsURL = 'http://localhost:5000/user_plants'

export default function PlantScreen({ route, userPlants, setUserPlants, tokenValue }) {
  const varietyId = route.params.id

  const [plant, setPlant] = useState({})
  const [owned, setOwned] = useState(false)

  useEffect(() => {
    fetch(varietyURL + varietyId)
      .then(response => response.json())
      .then(data => setPlant(data[0]))
  }, [])

  useEffect(() => {
    const isOwned = userPlants.some(plant => plant.id === varietyId)
    setOwned(isOwned)
  }, [userPlants])

  function savePlant() {
    fetch(userPlantsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      },
      body: JSON.stringify({ varietyId })
    }).then(response => response.json())
      .then(([userPlant]) => setUserPlants([...userPlants, userPlant]))
      .catch(err => alert(err.message))
  }

  function displayPlant() {
    return (
      <>
        <Text style={styles.header}>{plant.commonName}</Text>
        <Image style={styles.image} source={{ uri: plant.image }} alt={plant.commonName} />
        <Text style={styles.description}>{plant.description}</Text>
        <GrowingInfo plant={plant} />
        {owned ? null : <Button title='Add to Garden' onPress={savePlant} />}
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