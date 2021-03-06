import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

// const varietiesURL = 'http://localhost:5000/varieties'
const varietiesURL = 'https://garden-guide.herokuapp.com/varieties'

export default function AddVarietyForm({ plantId, setShowAddForm, varieties, setVarieties, tokenValue }) {
  const blankFormState = {
    plantId: plantId,
    scientificName: "",
    commonName: "",
    description: "",
    maturity: null,
    outdoor: null,
    indoor: null,
    habit: 'Other',
    image: ""
  }

  const [formData, setFormData] = useState(blankFormState)

  const selected = {
    padding: 4,
    fontSize: 16,
    backgroundColor: '#033a07',
    color: '#f5f5f5'
  }

  const unselected = {
    padding: 4,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    color: '#033a07'
  }

  return (
    <>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder='Common Name' onChangeText={text => {
          setFormData({ ...formData, commonName: text })
        }} />
        <TextInput style={styles.input} placeholder='Scientific Name' onChangeText={text => {
          setFormData({ ...formData, scientificName: text })
        }} />
        <TextInput multiline style={styles.input} placeholder='Description' onChangeText={text => {
          setFormData({ ...formData, description: text })
        }} />
        <TextInput style={styles.input} placeholder='Image' onChangeText={text => {
          setFormData({ ...formData, image: text })
        }} />
        <TextInput style={styles.input} placeholder='Days to Maturity' onChangeText={text => {
          setFormData({ ...formData, maturity: parseInt(text) })
        }} />
        <View style={styles.flex}>
          <TextInput style={styles.input} placeholder='Indoor Start' onChangeText={text => {
            setFormData({ ...formData, indoor: parseInt(text) })
          }} />
          <TextInput style={styles.input} placeholder='Outdoor Start' onChangeText={text => {
            setFormData({ ...formData, outdoor: parseInt(text) })
          }} />
        </View>
        <Text style={styles.detail}>
          Use '-X' to show X weeks before last frost
        </Text>
        <View style={styles.flex}>
          <TouchableOpacity
            onPress={() => setFormData({ ...formData, habit: 'Vine' })}
          >
            <Text style={formData.habit === 'Vine' ? selected : unselected}>
              Vine
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFormData({ ...formData, habit: 'Bush' })}
          >
            <Text style={formData.habit === 'Bush' ? selected : unselected}>
              Bush
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFormData({ ...formData, habit: null })}
          >
            <Text style={formData.habit === null ? selected : unselected}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flex, { marginHorizontal: 10 }]}>
        <TouchableOpacity onPress={cancelAdd}>
          <Text style={styles.button}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addPlant}>
          <Text style={styles.button}>Add Plant</Text>
        </TouchableOpacity>
      </View>
    </>
  )

  function cancelAdd() {
    setFormData(blankFormState)
    setShowAddForm(false)
  }

  function addPlant() {
    fetch(varietiesURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      },
      body: JSON.stringify(formData)
    }).then(response => response.json())
      .catch(err => alert(err.message))
      .then(newVariety => {
        setVarieties([...varieties, newVariety])
        setFormData(blankFormState)
        setShowAddForm(false)
      })
  }
}

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  card: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 5,
    backgroundColor: '#f5f5f5',
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5
  },
  input: {
    fontSize: 16,
    padding: 4
  },
  picker: {
    width: undefined,
    height: 40
  },
  detail: {
    padding: 4,
    fontSize: 14,
    textAlign: "center"
  },
  button: {
    color: '#033a07',
    backgroundColor: '#f5f5f5',
    padding: 5,
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    marginHorizontal: 25
  },
})
