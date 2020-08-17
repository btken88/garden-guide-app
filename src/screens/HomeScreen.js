import React from 'react'
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import HeaderBar from '../components/HeaderBar'

export default function HomeScreen({ setToken }) {


  return (
    <SafeAreaView style={styles.screenFill}>
      <View style={styles.fill}>
        <HeaderBar title='Garden Guide' />
        <View style={styles.newFeatures}>
          <Text style={styles.featuresHeader}>New Features Coming Soon:</Text>
          <Text style={styles.featuresContent}>See the upcoming weather for your zip code</Text>
          <Text style={styles.featuresContent}>See dates to plant seeds based on your zip code</Text>
          <Text style={styles.featuresContent}>Add new plant varieties to our database</Text>
          <Text style={styles.featuresContent}>Get notifications for when to plant your seeds</Text>
          <Text style={styles.featuresContent}>Add target completion dates to your todos</Text>
          <Text style={styles.featuresContent}>See alerts on the home page for upcoming planting dates and todos</Text>
        </View>
        <Button
          title="Log Out"
          onPress={() => {
            AsyncStorage.removeItem('token')
              .then(setToken(false))
              .catch(console.log)
          }}
          color='#033a07' />
      </View>
    </SafeAreaView >
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']

const styles = StyleSheet.create({
  newFeatures: {
    margin: 25,
    padding: 20,
    backgroundColor: '#f7f7ba',
    transform: [{ rotate: '2deg' }],
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 4,
    elevation: 1.5
  },
  fill: {
    flex: 1,
    backgroundColor: '#eef7ee'
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
    backgroundColor: white,
    flex: 1
  },
})

