import React, { useState } from 'react'
import { View, Button, SafeAreaView, ActivityIndicator } from 'react-native'
import SearchBar from '../components/SearchBar'
import useWeather from '../hooks/useWeather'

const Search = ({ navigation }) => {
  const [term, setTerm] = useState('')
  const { fetchWeather, loading, error, present } = useWeather()

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#a5d8ff' }}>
        <SafeAreaView>
          <SearchBar
            term={term}
            onTermChange={(newvalue) => {
              setTerm(newvalue)
            }}
          />
          <Button
            title={loading ? '' : 'Search'}
            style={{
              textAlign: 'center',
              marginTop: 7,
              fontSize: 25,
              fontWeight: 'bold',
            }}
            onPress={() => {
              // To go to Home, comment "fetchWeather" and uncomment "navigate" line
              fetchWeather(term).then(() => {
                navigation.navigate('Home', {
                  term: term,
                })
              })
            }}
          />
          <View>
            {loading && <ActivityIndicator size="large" color={'#1864ab'} />}
          </View>
        </SafeAreaView>
      </View>
    </>
  )
}

export default Search
