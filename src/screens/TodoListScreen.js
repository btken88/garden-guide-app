import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import TodoForm from '../components/TodoForm'
import TodoCard from '../components/TodoCard'
import HeaderBar from '../components/HeaderBar'

const todosURL = 'http://localhost:5000/todos'
const image = require('../../assets/colorful-vegetables-low.jpg')

export default function TodoListScreen({ tokenValue }) {
  const [newTodo, setNewTodo] = useState(false)
  const [todos, setTodos] = useState([])
  const [done, setDone] = useState([])
  const [notDone, setNotDone] = useState([])

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

  useEffect(() => {
    const finished = todos.filter(todo => todo.done === true)
    const unfinished = todos.filter(todo => todo.done !== true)
    setDone(finished)
    setNotDone(unfinished)
  }, [todos])

  function todosList() {
    return (
      <>
        <FlatList
          data={notDone}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return <TodoCard
              todoData={item}
              todos={todos}
              setTodos={setTodos}
              tokenValue={tokenValue} />
          }} />
        {done.length
          ? <View style={{ maxHeight: 200 }}>
            <Text style={[styles.notodo, { margin: 0 }]}>Completed</Text>
            <FlatList
              data={done}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                return <TodoCard
                  todoData={item}
                  todos={todos}
                  setTodos={setTodos}
                  tokenValue={tokenValue} />
              }} />
          </View>
          : null}
      </>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.fill}>
        <HeaderBar title='To Do List' />
        {newTodo
          ? <TodoForm
            setNewTodo={setNewTodo}
            todos={todos}
            setTodos={setTodos}
            tokenValue={tokenValue} />
          : <TouchableOpacity onPress={() => setNewTodo(true)}>
            <Text style={styles.button}>Add a new To Do</Text>
          </TouchableOpacity>}
        {todos.length
          ? todosList()
          : <Text style={styles.notodo}>No Todos Yet</Text>}
      </View>
    </SafeAreaView>
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']


const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#033a07'
  },
  backgroundImage: {
    width: '100%',
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5
  },
  header: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: "center",
    color: brown,
    textShadowColor: white,
    textShadowRadius: 3,
    fontWeight: "bold",
  },
  notodo: {
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    color: '#f5f5f5'
  },
  button: {
    color: '#033a07',
    backgroundColor: '#f5f5f5',
    padding: 5,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 125,
    marginTop: 8
  }
})