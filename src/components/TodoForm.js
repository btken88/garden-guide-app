import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, Switch, Button } from 'react-native'

const todoURL = 'http://localhost:5000/todos'
export default function TodoForm({ setNewTodo, todos, setTodos }) {
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todoForm)
    }).then(response => response.json())
      .then(todo => setTodos([...todos, todo]))
    setNewTodo(false)
  }

  return (
    <View>
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
          onPress={submitForm} />
        <Button
          title="Cancel"
          onPress={() => setNewTodo(false)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    textAlignVertical: 'top',
    height: 100,
    borderRadius: 5,
    borderColor: '#033a07',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    fontSize: 16
  },
  urgent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginHorizontal: 40
  }
})