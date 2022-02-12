import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import moment from 'moment'

const Details = ({ result }) => {
  const Time = ({ time }) => {
    let correctTime
    if (time === '0') {
      correctTime = '12 AM'
    } else {
      correctTime = moment(time, ['hmm']).format('hh A')
    }
    return (
      <Text style={{ fontSize: 16, color: '#f7f7f7' }}> {correctTime}</Text>
    )
  }

  return (
    <View>
      <FlatList
        data={result}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Time time={item.time} />
              <Image
                source={{ uri: `${item.weatherIconUrl[0].value.toString()}` }}
                style={styles.image}
              />
              <Text style={styles.text}>{item.tempC}°</Text>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 7,
    padding: 5,
    marginTop: 5,
  },
  container: {
    margin: 5,
    borderRightColor: '#f8f9fa',
    borderRightWidth: 1,
    paddingRight: 6,
  },
  text: { fontSize: 18, textAlign: 'center', color: '#f7f7f7' },
})

export default Details
