import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import HeaderBar from '../components/HeaderBar'

// const signUpURL = 'http://localhost:5000/signup'
const signUpURL = 'http://garden-guide.herokuapp.com/signup'

const initialState = {
  first_name: '',
  last_name: '',
  zip: null,
  email: '',
  password: ''
}

export default function SignUpScreen({ navigation, setToken, setTokenValue }) {
  const [user, setUser] = useState(initialState)

  function signUp() {
    fetch(signUpURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(response => response.json())
      .then((result) => {
        if (result.token) {
          AsyncStorage.setItem('token', result.token)
          setToken(true)
          setTokenValue(result.token)
        } else {
          alert(result.error)
        }
      })
      .catch(err => alert(err.message))
  }

  return (
    <SafeAreaView>
      <HeaderBar title='Sign Up' />
      <View style={styles.fill}>
        <View style={styles.card}>

          <View style={styles.nameContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                autoCorrect={false}
                style={styles.input}
                placeholder='First Name'
                value={user.first_name}
                onChangeText={text => setUser({ ...user, first_name: text })} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                autoCorrect={false}
                style={styles.input}
                placeholder='Last Name'
                value={user.last_name}
                onChangeText={text => setUser({ ...user, last_name: text })} />
            </View>
          </View>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            placeholder='Zip Code'
            value={user.zip}
            onChangeText={text => setUser({ ...user, zip: text })} />
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
            <TouchableOpacity onPress={signUp}>
              <Text style={styles.button}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
              <Text style={styles.button}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
    elevation: 1.5,
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
  nameContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    color: '#f5f5f5',
    backgroundColor: '#033a07',
    padding: 5,
    textAlign: "center",
    fontSize: 18,
  }
})