import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Switch, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const todoURL = 'http://localhost:5000/todos'
export default function TodoForm({ setNewTodo, todos, setTodos, tokenValue }) {
  const [todoForm, setTodoForm] = useState({
    todo: '',
    done: false,
    urgent: false
  })

  function changeText(text) {
    setTodoForm({
      ...todoForm,
      todo: text
    })
  }
  function changeSwitch() {
    setTodoForm({
      ...todoForm,
      urgent: !todoForm.urgent
    })
  }

  function submitForm() {
    fetch(todoURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      },
      body: JSON.stringify(todoForm)
    }).then(response => response.json())
      .then(todo => setTodos([...todos, todo]))
    setNewTodo(false)
  }

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        placeholder="New todo"
        defaultValue={todoForm.todo}
        onChangeText={text => changeText(text)}
        multiline />
      <View style={styles.urgent}>
        <Switch
          value={todoForm.urgent}
          onValueChange={changeSwitch} />
        <Text style={{ fontSize: 16 }}>Urgent</Text>
        <Button
          title="Submit"
          onPress={submitForm}
          color='#033a07' />
        <Button
          title="Cancel"
          onPress={() => setNewTodo(false)}
          color='#033a07' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  urgent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginHorizontal: 40
  },
  card: {
    margin: 10,
    padding: 8,
    borderRadius: 2,
    backgroundColor: '#f5f5f5',
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5
  },
  input: {
    textAlignVertical: 'top',
    height: 100,
    borderRadius: 2,
    borderColor: '#eef7ee',
    borderWidth: 1,
    backgroundColor: '#f5f5f5',
    margin: 10,
    padding: 5,
    fontSize: 16,
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5
  },
})