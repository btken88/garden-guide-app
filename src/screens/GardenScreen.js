import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet, ImageBackground, FlatList } from 'react-native'
import PlantCard from '../components/PlantCard'

const image = require('../../assets/colorful-vegetables-low.jpg')

export default function GardenScreen({ navigation, tokenValue, userPlants, setUserPlants }) {

  return (
    <SafeAreaView>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <Text style={styles.header}>My Garden</Text>
      </ImageBackground>
      {userPlants.length
        ? <FlatList
          data={userPlants}
          keyExtractor={item => item.user_plant_id.toString()}
          renderItem={({ item }) => {
            return <PlantCard
              plant={item}
              location='Plant Variety'
              navigation={navigation} />
          }} />
        : <Text>Add some plants to get started!</Text>}
    </SafeAreaView>
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']


const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    marginBottom: 8,
    shadowColor: "#033a07",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: "center",
    color: brown,
    textShadowColor: white,
    textShadowRadius: 3,
    fontWeight: "bold"
  },
})