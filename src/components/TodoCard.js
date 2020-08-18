import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, Button, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const todoURL = 'http://localhost:5000/todos/'

export default function TodoCard({ todoData, todos, setTodos, tokenValue }) {
  const [todo, setTodo] = useState(todoData)
  const [edit, setEdit] = useState(false)

  function backgroundColor() {
    return todo.urgent ? '#fafad1' : '#f5f5f5'
  }

  const styles = StyleSheet.create({
    todoCard: {
      margin: 10,
      padding: 8,
      borderRadius: 2,
      backgroundColor: backgroundColor(),
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
    text: {
      fontSize: 16
    },
    doneContainer: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }
  })

  function markDone() {
    const updatedTodo = { ...todo, done: !todo.done }
    setTodo(updatedTodo)
    console.log('updated', updatedTodo)
    fetch(todoURL + todo.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      },
      body: JSON.stringify(updatedTodo)
    }).then(response => response.json())
      .then(newTodo => {
        console.log('new todo', newTodo)
        const updatedTodos = todos.map(todo => {
          return todo.id === newTodo.id ? newTodo : todo
        })
        setTodos([...updatedTodos])
      })
  }

  function saveEdit() {
    fetch(todoURL + todo.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      },
      body: JSON.stringify(todo)
    }).then(response => response.json())
      .then(newtodo => {
        const updatedTodos = todos.map(oldTodo => {
          return oldTodo.id === newtodo.id ? newtodo : oldTodo
        })
        setTodos(updatedTodos)
        setEdit(false)
      })
  }

  function deleteTodo() {
    fetch(todoURL + todo.id, {
      method: 'DELETE',
      headers: {
        'Authorization': tokenValue
      }
    }).then(() => {
      const updatedTodos = todos.filter(newtodo => newtodo.id !== todo.id)
      setTodos(updatedTodos)
    })
  }

  function createCard() {
    if (edit) {
      return (
        <>
          <TextInput
            style={styles.input}
            onChangeText={text => setTodo({ ...todo, todo: text })}
            value={todo.todo}
            multiline />
          <View style={styles.buttonContainer}>
            <View style={styles.doneContainer}>
              <Switch
                style={{ marginRight: 10 }}
                value={todo.done}
                onValueChange={markDone} />
              <Text style={styles.text}>Done!</Text>
            </View>
            <View style={styles.doneContainer}>
              <Switch
                style={{ marginRight: 10 }}
                value={todo.urgent}
                onValueChange={() => setTodo({ ...todo, urgent: !todo.urgent })} />
              <Text style={styles.text}>Urgent</Text>
            </View>
            <Button title="Save" onPress={saveEdit} color='#033a07' />
            <Button title="Delete" onPress={deleteTodo} color='#033a07' />
          </View>
        </>
      )
    } else {
      return (
        <>
          <Text style={styles.text}>{todo.todo}</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.doneContainer}>
              <Switch
                style={{ marginRight: 10 }}
                value={todo.done}
                onValueChange={markDone} />
              <Text style={styles.text}>Done!</Text>
            </View>
            <Button title="Edit" onPress={() => setEdit(true)} color='#033a07' />
          </View>
        </>
      )
    }
  }

  return (
    <View style={styles.todoCard}>
      {createCard()}
    </View>
  )
}
