import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

const todoURL = 'http://localhost:5000/todos/'

export default function TodoCard({ todoData, todos, setTodos }) {
  const [todo, setTodo] = useState(todoData)
  const [edit, setEdit] = useState(false)

  function backgroundColor() {
    return todo.urgent ? '#f5f6a2' : '#f5f5f5'
  }

  const styles = StyleSheet.create({
    todoCard: {
      margin: 10,
      padding: 8,
      borderColor: '#033a07',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: backgroundColor()
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
    fetch(todoURL + todo.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo)
    }).then(response => response.json())
      .then(newTodo => {
        const updatedTodos = todos.map(todo => {
          return todo.id === newTodo.id ? newTodo : todo
        })
        setTodos(updatedTodos)
      })
  }

  return (
    <View style={styles.todoCard}>
      <Text style={styles.text}>{todo.todo}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.doneContainer}>
          <Switch
            style={{ marginRight: 10 }}
            value={todo.done}
            onValueChange={markDone} />
          <Text style={styles.text}>Done!</Text>
        </View>
      </View>
    </View>
  )
}
