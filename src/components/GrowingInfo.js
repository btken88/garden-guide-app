import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function GrowingInfo(props) {
  const { habit, indoor, outdoor, maturity, scientificName } = props.plant

  function startDate(weeks) {
    if (weeks === 0) return 'Week of last frost'
    return weeks < 0
      ? `${Math.abs(weeks)} weeks before last frost`
      : `${weeks} weeks after last frost`
  }

  return (
    <View style={styles.card}>
      <Text style={styles.scientific}>{scientificName}</Text>
      <View style={styles.seedCard}>
        <Text style={styles.centerWhite}>Seed Start Dates:</Text>
        <View style={styles.flexCard}>
          <View style={styles.dateCard}>
            <Text style={[styles.whiteText, { marginBottom: 5 }]}>Indoor:</Text>
            <Text style={[styles.whiteText, { flexWrap: "wrap" }]}>
              {indoor === null ? 'Not Recommended' : startDate(indoor)}
            </Text>
          </View>
          <View style={styles.dateCard}>
            <Text style={[styles.whiteText, { marginBottom: 5 }]}>Outdoor:</Text>
            <Text style={[styles.whiteText, { flexWrap: "wrap" }]}>
              {outdoor === null ? 'Not Recommended' : startDate(outdoor)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.flexCard}>
        <View style={styles.maturity}>
          <Text style={styles.whiteText}>Days to maturity: {maturity}</Text>
        </View>
        <View style={styles.habit}>
          <Text style={styles.whiteText}>Habit: {habit === null ? 'Other' : habit}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f6a2',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    shadowColor: '#033a07',
    shadowOpacity: .2,
    shadowOffset: { width: 0, height: .5 },
    shadowRadius: 2,
    elevation: 1.5
  },
  scientific: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  flexCard: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  seedCard: {
    backgroundColor: '#033a07',
    padding: 8,
    borderRadius: 2,
    marginBottom: 10
  },
  habit: {
    padding: 8,
    borderRadius: 2,
    backgroundColor: '#7a152e'
  },
  maturity: {
    padding: 8,
    borderRadius: 2,
    backgroundColor: '#461c0c'
  },
  center: {
    textAlign: 'center',
    fontSize: 16
  },
  centerWhite: {
    fontSize: 16,
    textAlign: 'center',
    color: '#f5f5f5'
  },
  text: {
    fontSize: 16
  },
  whiteText: {
    fontSize: 16,
    color: '#f5f5f5'
  },
  dateCard: {
    padding: 5,
    width: 0,
    flexGrow: 1,
    flex: 1
  }
})