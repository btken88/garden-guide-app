import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { AppLoading } from 'expo'
import PlantCard from '../components/PlantCard'

const baseURL = 'http://localhost:5000'

export default function PlantListScreen({ navigation }) {
  const [plants, setPlants] = useState([])

  useEffect(() => {
    fetch(baseURL + '/plants')
      .then(response => response.json())
      .then(plants => setPlants([...plants.sort((a, b) => a.id - b.id)]))
  }, [])

  return (
    <SafeAreaView style={styles.screenFill}>
      <Text style={styles.header}>Select a plant for more info</Text>
      {plants.length
        ? <FlatList
          data={plants}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return <PlantCard
              name={item.name}
              id={item.id}
              image={item.image}
              navigation={navigation}
              location='Plant Details' />
          }} />
        : null}
    </SafeAreaView>
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']

const styles = StyleSheet.create({
  screenFill: {
    flex: 1,
    backgroundColor: white
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 8
  }
})