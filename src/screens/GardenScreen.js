import React from 'react'
import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native'
import PlantCard from '../components/PlantCard'
import HeaderBar from '../components/HeaderBar'

export default function GardenScreen({ navigation, tokenValue, userPlants, setUserPlants }) {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.fill}>
        <HeaderBar title='My Garden' />
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
          : <Text style={styles.noGarden}>Add plants to get started!</Text>}
      </View>
    </SafeAreaView>
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']


const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#033a07'
  },
  noGarden: {
    fontSize: 20,
    color: '#f5f5f5',
    textAlign: "center",
    marginVertical: 20
  }
})