import React from 'react'
import { View, Text, SafeAreaView, ImageBackground, StyleSheet } from 'react-native'

export default function HomeScreen() {
  const image = require('../../assets/colorful-vegetables-low.jpg')
  return (
    <SafeAreaView style={styles.screenFill}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <Text style={styles.header}>Garden Guide</Text>
      </ImageBackground>
      <View style={styles.newFeatures}>
        <Text style={styles.featuresHeader}>New Features Coming Soon:</Text>
        <Text style={styles.featuresContent}>View descriptions of different plants</Text>
        <Text style={styles.featuresContent}>Create a garden todo list</Text>
        <Text style={styles.featuresContent}>View growing information for different plant varieties.</Text>
        <Text style={styles.featuresContent}>Save plant varieties to your seed vault</Text>
        <Text style={styles.featuresContent}>Make notes about the plants in your seed vault</Text>
        <Text style={styles.featuresContent}>Save plants to your garden for the year to track growth</Text>
        <Text style={styles.featuresContent}>Add new plant varieties to our database</Text>
        <Text style={styles.featuresContent}>Get notifications for when to plant your seeds</Text>
      </View>
    </SafeAreaView >
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: "center",
    color: brown,
    textShadowColor: white,
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  newFeatures: {
    margin: 25,
    padding: 20,
    backgroundColor: yellow,
    transform: [{ rotate: '2deg' }],
    shadowColor: black,
    shadowRadius: 5,
    shadowOpacity: .5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4
  },
  featuresHeader: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  featuresContent: {
    fontSize: 16
  },
  screenFill: {
    backgroundColor: green,
    flex: 1
  },
  backgroundImage: {
    width: '100%',
  },
})

