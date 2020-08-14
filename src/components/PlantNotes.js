import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'

const userPlantsURL = 'http://localhost:5000/user_plants/'

export default function PlantNotes({ plant, userPlants, setUserPlants, tokenValue }) {
  const [edit, setEdit] = useState(false)
  const [note, setNote] = useState(plant.notes || '')
  return (
    <View>
      {plant.notes ? showNote() : addNote()}
    </View>
  )

  function showNote() {
    if (!edit) return (
      <TouchableOpacity onPress={() => setEdit(true)}>
        <Text overflow='hidden' style={styles.description}>{plant.notes}</Text>
      </TouchableOpacity>
    )
    else return (
      <>
        <TextInput
          textAlignVertical='top'
          multiline={true}
          style={styles.edit}
          value={note}
          onChangeText={text => setNote(text)} />
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={saveNote} color='#033a07' />
          <Button title="Cancel" onPress={() => setEdit(false)} color='#033a07' />
        </View>
      </>
    )
  }

  function addNote() {
    return (
      <>
        <TextInput
          placeholder='Add a note'
          textAlignVertical='top'
          multiline={true}
          style={styles.edit}
          value={note}
          onChangeText={text => setNote(text)} />
        <Button title="Save" onPress={saveNote} color='#033a07' />
      </>
    )
  }
  function saveNote() {
    fetch(userPlantsURL + plant.user_plant_id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      },
      body: JSON.stringify({ notes: note })
    }).then(response => response.json())
      .then(result => { if (result.error) return alert(result.error) })
      .then(() => {
        plant.notes = note
        const newUserPlants = userPlants.map(oldPlant => {
          return oldPlant.user_plant_id === plant.user_plant_id
            ? plant
            : oldPlant
        })
        setUserPlants(newUserPlants)
        setEdit(false)
      }).catch(err => alert(err.message))
  }
}

const styles = StyleSheet.create({
  description: {
    marginHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 5,
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5,
  },
  edit: {
    marginHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 5,
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    marginHorizontal: 40
  }
})