import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import GrowingInfo from '../components/GrowingInfo'

// const varietyURL = 'http://localhost:5000/varieties/'
// const userPlantsURL = 'http://localhost:5000/user_plants'
const varietyURL = 'https://garden-guide.herokuapp.com/varieties/'
const userPlantsURL = 'http://garden-guide.herokuapp.com/user_plants'

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
        <Image style={styles.image} source={{ uri: plant.image }} alt={plant.commonName} />
        <Text style={styles.description}>{plant.description}</Text>
        <GrowingInfo plant={plant} />
        {owned
          ? null
          : <TouchableOpacity onPress={savePlant}>
            <Text style={styles.button}>Add to Garden</Text>
          </TouchableOpacity>}
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
    backgroundColor: '#033a07'
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10
  },
  image: {
    height: 200,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 2
  },
  description: {
    marginHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    padding: 8,
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5
  },
  button: {
    color: '#033a07',
    backgroundColor: '#f5f5f5',
    padding: 5,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 125,
    marginVertical: 5
  }
})