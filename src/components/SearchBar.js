import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const SearchBar = ({ term, onTermChange }) => {
  return (
    <View style={styles.background}>
      <FontAwesome name="search" size={25} style={styles.iconstyle} />
      <TextInput
        style={styles.textstyle}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search..."
        onChangeText={onTermChange}
        value={term}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#dee2e6',
    borderRadius: 8,
    marginHorizontal: 10,
    height: 50,
    marginTop: 25,
    flexDirection: 'row',
    marginBottom: 5,
  },
  iconstyle: {
    margin: 8,
  },
  textstyle: {
    flex: 1,
    fontSize: 16,
  },
})

export default SearchBar
