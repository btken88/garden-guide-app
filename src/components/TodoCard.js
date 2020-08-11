import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

const todoURL = 'http://localhost:5000/todos/'

export default function TodoCard(props) {
  const [todo, setTodo] = useState({ ...props.todo })

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
    setTodo({ ...todo, done: !todo.done })
    fetch()
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
