import React, { useState } from 'react'
import { SafeAreaView, View, Text, TextInput, Button, ImageBackground, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import HeaderBar from '../components/HeaderBar'

const signUpURL = 'http://localhost:5000/signup'

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
      .then(({ token }) => {
        AsyncStorage.setItem('token', token)
        setToken(true)
        setTokenValue(token)
      })
      .catch(err => alert(err.message))
  }

  return (
    <SafeAreaView>
      <HeaderBar title='Sign Up' />
      <View style={styles.nameContainer}>
        <View>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            autoCorrect={false}
            style={[styles.input, { width: 160 }]}
            placeholder='First Name'
            value={user.first_name}
            onChangeText={text => setUser({ ...user, first_name: text })} />
        </View>
        <View>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            autoCorrect={false}
            style={[styles.input, { width: 220 }]}
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
        <Button title="Sign Up" color={green} onPress={signUp} />
        <Button
          title="Back to Sign In"
          color={green}
          onPress={() => navigation.navigate('Sign In')} />
      </View>
    </SafeAreaView>
  )
}

const [red, green, brown, yellow, black, white] = ['#7a152e', '#033a07', '#461c0c', '#f5f6a2', '#040b10', '#f5f5f5']

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: "center",
    color: brown,
    textShadowColor: white,
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  backgroundImage: {
    width: '100%',
    shadowColor: "#033a07",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    borderColor: green,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    padding: 5,
    margin: 8,
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
    paddingHorizontal: 20
  },
  nameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
})