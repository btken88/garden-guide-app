import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

export default function PlantNotes({ plant, userPlants, setUserPlants, TokenValue }) {
  const [edit, setEdit] = useState(false)
  const [note, setNote] = useState(plant.notes || '')
  return (
    <View>
      {plant.notes ? showNote() : addNote()}
    </View>
  )

  function showNote() {
    if (edit) return (
      <>
        <Text>{plant.note}</Text>
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
  }
}
