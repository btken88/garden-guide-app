import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, ImageBackground, StyleSheet, Button, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import TodoForm from '../components/TodoForm'
import TodoCard from '../components/TodoCard'

const todosURL = 'http://localhost:5000/todos'
const image = require('../../assets/colorful-vegetables-low.jpg')

export default function TodoListScreen({ tokenValue }) {
  const [newTodo, setNewTodo] = useState(false)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch(todosURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenValue
      }
    })
      .then(response => response.json())
      .then(todos => setTodos(todos))
      .catch(err => console.error(err.message))
  }, [])

  function todosList() {
    return <FlatList
      data={todos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => {
        return <TodoCard
          todoData={item}
          todos={todos}
          setTodos={setTodos}
          tokenValue={tokenValue} />
      }} />
  }

  return (
    <SafeAreaView>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <Text style={styles.header}>To Do List</Text>
      </ImageBackground>
      {newTodo
        ? <TodoForm
          setNewTodo={setNewTodo}
          todos={todos}
          setTodos={setTodos}
          tokenValue={tokenValue} />
        : <Button
          onPress={() => setNewTodo(true)}
          title='Add a New Todo'
          color='#033a07' />}
      {todos.length
        ? todosList()
        : <Text style={styles.notodo}>No Todos Yet</Text>}
    </SafeAreaView>
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']


const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    marginBottom: 10
  },
  header: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: "center",
    color: brown,
    textShadowColor: white,
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  notodo: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  }
})