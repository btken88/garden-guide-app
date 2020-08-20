import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, SafeAreaView, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import HeaderBar from '../components/HeaderBar'

const initialState = {
  email: '',
  password: ''
}

// const loginURL = 'http://localhost:5000/login'
const loginURL = 'http://garden-guide.herokuapp.com/login'

export default function SignInScreen({ navigation, setToken, setTokenValue }) {
  const [user, setUser] = useState(initialState)

  function logIn() {
    fetch(loginURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(response => response.json())
      .then(result => {
        if (result.token) {
          AsyncStorage.setItem('token', result.token)
          setToken(true)
          setTokenValue(result.token)
        } else {
          alert(result.error)
        }
      })
      .catch(error => alert(error.error))
  }

  return (
    <SafeAreaView>
      <HeaderBar title='Sign In' />
      <View style={styles.fill}>
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholder='Email'
            value={user.email}
            onChangeText={text => setUser({ ...user, email: text })} />
          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            secureTextEntry={true}
            placeholder='Password'
            value={user.password}
            onChangeText={text => setUser({ ...user, password: text })} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={logIn}>
              <Text style={styles.button}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
              <Text style={styles.button}>New User? Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView >
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']

const styles = StyleSheet.create({
  fill: {
    backgroundColor: '#033a07',
    height: '100%',
  },
  card: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    marginTop: 60,
    borderRadius: 2,
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 4,
    elevation: 1.5
  },
  input: {
    backgroundColor: '#fafafa',
    borderRadius: 2,
    fontSize: 16,
    padding: 5,
    margin: 8,
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5
  },
  label: {
    marginLeft: 20,
    fontSize: 16,
    marginTop: 8
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10
  },
  button: {
    color: '#f5f5f5',
    backgroundColor: '#033a07',
    padding: 5,
    textAlign: "center",
    fontSize: 18,
  }
})
