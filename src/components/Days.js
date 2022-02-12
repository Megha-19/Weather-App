import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import moment from 'moment'

const Days = ({ data }) => {
  return (
    <View>
      <FlatList
        data={data}
        style={styles.container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 2,
              width: '100%',
            }}
          >
            <Text style={{ ...styles.text }}>
              {moment(item.date).format('dddd')}
            </Text>
            <Text style={{ ...styles.text, textAlign: 'center' }}>
              {' '}
              {item.maxtempC}°{' '}
            </Text>
            <Text
              style={{
                ...styles.text,
                textAlign: 'right',
              }}
            >
              {' '}
              {item.mintempC}°{' '}
            </Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginTop: 5, marginBottom: 5, marginLeft: 2, marginRight: 2 },
  text: {
    fontSize: 16,
    color: '#f7f7f7',
    padding: 2,
    flex: 1,
  },
})

export default Days
