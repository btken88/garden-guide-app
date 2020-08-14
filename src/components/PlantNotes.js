import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

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
      <>
        <Text>{plant.notes}</Text>
        <Button title="Edit" onPress={() => setEdit(true)} color='#033a07' />
      </>
    )
    else return (
      <>
        <TextInput value={note} onChangeText={text => setNote(text)} />
        <Button title="Save" onPress={saveNote} color='#033a07' />
      </>
    )
  }

  function addNote() {
    return (
      <>
        <Text>Add a note below</Text>
        <TextInput value={note} onChangeText={text => setNote(text)} />
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
