import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function Weather({ weather }) {
  const { current, daily } = weather

  function currentWeather() {

    const iconURL = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`
    return (
      <>
        <Text style={[styles.header, { marginTop: 0 }]}>Current Weather</Text>
        <Image style={styles.icon} source={{ uri: iconURL }} alt={current.weather[0].main} />
        <Text>{current.weather[0].main}</Text>
        <Text>Temp: {Math.floor(current.temp)}°</Text>
        <Text>Feels Like: {Math.floor(current.feels_like)}°</Text>
      </>)
  }

  function fourDayForecast() {
    return daily.slice(0, 4).map(day => {
      const iconURL = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
      return (
        <View key={day.sunrise} style={styles.day}>
          <Image style={styles.icon} source={{ uri: iconURL }} alt={day.weather[0].main} />
          <Text style={{ textAlign: 'center' }}>{day.weather[0].main}</Text>
          <Text>High: {Math.floor(day.temp.max)}°</Text>
          <Text>Low: {Math.floor(day.temp.min)}°</Text>
        </View>
      )
    })
  }

  return (
    <View style={styles.container}>
      {currentWeather()}
      <Text style={styles.header}>Four Day Forecast</Text>
      <View style={styles.forecast}>
        {fourDayForecast()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 70,
    width: 70
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5,
    padding: 10
  },
  forecast: {
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    fontSize: 18,
    marginVertical: 10
  },
  day: {
    marginHorizontal: 5
  }
})