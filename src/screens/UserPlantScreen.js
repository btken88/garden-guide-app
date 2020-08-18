import React from 'react'
import { ScrollView, Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import GrowingInfo from '../components/GrowingInfo'
import PlantNotes from '../components/PlantNotes'

// const varietyURL = 'https://garden-guide.herokuapp.com/varieties/'
const varietyURL = 'http://localhost:5000/varieties/'
const userPlantURL = 'http://localhost:5000/user_plants/'

export default function UserPlantScreen({ navigation, route, setUserPlants, userPlants, tokenValue }) {
  const plant = route.params.plant

  function deletePlant() {
    fetch(userPlantURL + plant.user_plant_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      }
    }).then(() => {
      const newUserPlants = userPlants.filter(oldPlant => {
        return oldPlant.user_plant_id !== plant.user_plant_id
      })
      setUserPlants(newUserPlants)
      navigation.navigate('My Garden')
    }).catch(err => alert(err))
  }

  return (
    <ScrollView style={styles.fill}>
      <View style={styles.imageShadow}>
        <Image style={styles.image} source={{ uri: plant.image }} alt={plant.commonName} />
      </View>
      <Text style={styles.description}>{plant.description}</Text>
      <GrowingInfo plant={plant} />
      <PlantNotes
        setUserPlants={setUserPlants}
        userPlants={userPlants}
        tokenValue={tokenValue}
        plant={plant} />
      <TouchableOpacity onPress={deletePlant}>
        <Text style={styles.button}>Delete Plant</Text>
      </TouchableOpacity>
    </ScrollView>
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
  imageShadow: {
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5,
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