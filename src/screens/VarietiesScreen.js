import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, FlatList, Button } from 'react-native'
import PlantCard from '../components/PlantCard'
import AddVarietyForm from '../components/AddVarietyForm'

// const plantsBaseURL = 'https://garden-guide.herokuapp.com/plants/'
// const varietiesBaseURL = 'https://garden-guide.herokuapp.com/varieties/'

const plantsBaseURL = 'http://localhost:5000/plants/'
const varietiesBaseURL = 'http://localhost:5000/varieties/'

export default function VarietiesScreen({ route, navigation, tokenValue }) {
  const plantId = route.params.id

  const blankFormState = {
    plantId: plantId,
    scientificName: "",
    commonName: "",
    description: "",
    maturity: null,
    outdoor: null,
    indoor: null,
    habit: null,
    image: ""
  }

  const [plant, setPlant] = useState({})
  const [varieties, setVarieties] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetch(plantsBaseURL + plantId)
      .then(response => response.json())
      .then(data => setPlant(data[0]))
  }, [])

  useEffect(() => {
    fetch(varietiesBaseURL + `plantId/${plantId}`)
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
    <View style={styles.fill}>
      {plant.name
        ? <>
          <Image style={styles.image} source={{ uri: plant.image }} alt={plant.name} />
          <View style={styles.scroll}>
            <ScrollView>
              <Text style={styles.description}>{plant.description}</Text>
            </ScrollView>
          </View>
        </>
        : null}
      {varieties.length
        ? varietyList()
        : null}
      {showAddForm
        ? <AddVarietyForm
          plantId={plantId}
          setShowAddForm={setShowAddForm}
          varieties={varieties}
          setVarieties={setVarieties}
          tokenValue={tokenValue} />
        : <Button
          title="Add a Variety"
          color="#033a07"
          onPress={() => setShowAddForm(true)}
          style={styles.bottom} />}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 180,
    margin: 10,
    borderRadius: 5
  },
  fill: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#eef7ee'
  },
  description: {
    fontSize: 16,
  },
  scroll: {
    padding: 10,
    borderRadius: 2,
    marginHorizontal: 20,
    maxHeight: 150,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5
  },
  bottom: {
    alignSelf: 'flex-end'
  }
})