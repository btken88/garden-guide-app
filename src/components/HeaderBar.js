import React from 'react'
import { ImageBackground, Text, StyleSheet } from 'react-native'

export default function HeaderBar({ title }) {
  const image = require('../../assets/colorful-vegetables-low.jpg')

  return (
    <ImageBackground source={image} style={styles.backgroundImage}>
      <Text style={styles.header}>{title}</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: "center",
    color: '#461c0c',
    textShadowColor: "#f5f5f5",
    textShadowRadius: 2,
    fontWeight: "bold"
  },
  backgroundImage: {
    width: '100%',
    shadowColor: '#033a07',
    shadowOpacity: .3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1.5
  },
})