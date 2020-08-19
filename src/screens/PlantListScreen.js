import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import PlantCard from '../components/PlantCard'
import HeaderBar from '../components/HeaderBar'

// const baseURL = 'https://garden-guide.herokuapp.com'
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
      <View style={styles.fill}>
        <HeaderBar title='Our Plants' />
        {plants.length
          ? <FlatList
            data={plants}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              return <PlantCard
                plant={item}
                navigation={navigation}
                location='Plant Details' />
            }} />
          : null}
      </View>
    </SafeAreaView>
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']

const styles = StyleSheet.create({
  screenFill: {
    flex: 1,
    backgroundColor: white
  },
  fill: {
    backgroundColor: '#033a07',
    flex: 1
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 8
  }
})