import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import useWeather from '../hooks/useWeather'
import Details from '../components/Details'
import Days from '../components/Days'
import moment from 'moment'

const Home = ({ navigation }) => {
  const { fetchWeather, loading, error, present, city, hourly, days, max } =
    useWeather()
  const term = (navigation.state.params && navigation.state.params.term) || ''
  const [backgroundColor, setBackgroundColor] = useState('#a5d8ff')

  useEffect(() => {
    fetchWeather(term)
    // to add yellow and dark background at afternoon and night
    if (moment().format('HH') > 12) {
      setBackgroundColor('#f9d71c')
    }
    if (moment().format('HH') > 20) {
      setBackgroundColor('#212529')
    }
  }, [term])

  const Header = ({ heading, value }) => {
    return (
      <View style={styles.rainContainer}>
        <Text style={{ color: 'white', fontSize: 16 }}>{heading}</Text>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
            marginRight: 4,
          }}
        >
          {value}
        </Text>
      </View>
    )
  }
  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" style={styles.loader} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ff6b6b' }}>
        <Text style={styles.errorContainer}>
          {error} {'\n'} Please try again
        </Text>
      </View>
    )
  }
  return (
    <ScrollView
      style={{ backgroundColor }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <View>
          <View style={styles.cityContainer}>
            <Text style={styles.city}>{city}</Text>
            <View>
              <FlatList
                data={present}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.tempText}>{item.temp_C}°</Text>
                    <Text style={styles.tempText}>
                      {item.weatherDesc.map((val) => val.value)}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', color: '#f7f7f7' }}
              >
                {moment(max.date).format('dddd')}
              </Text>
              <Text style={{ color: '#f7f7f7', fontSize: 18 }}> (Today)</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Text style={styles.headingTemp}>{max.maxtempC}° </Text>
              <Text style={styles.headingTemp}>{max.mintempC}° </Text>
            </View>
          </View>
          {/* shows hourly temperature details */}
          <Details result={hourly} />
          {/* shows temperature details by days */}
          <Days data={days} />
          <View>
            <FlatList
              data={present}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <Header heading="PRECIPITATION" value={item.precipMM} />
                  <Header heading="CLOUD COVER" value={item.cloudcover} />
                  <Header heading="PRESSURE" value={item.pressureInches} />
                  <Header heading="VISIBILITY" value={item.visibility} />
                  <Header heading="HUMIDITY" value={item.humidity} />
                  <Header heading="WIND SPEED" value={item.windspeedKmph} />
                  <Header heading="UV INDEX" value={item.uvIndex} />
                </View>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    fontSize: 18,
    marginTop: Dimensions.get('window').height / 2.5,
    textAlign: 'center',
    paddingHorizontal: 5,
    color: 'white',
  },
  bgImage: { width: '100%', height: '100%', flex: 1, resizeMode: 'stretch' },
  cityContainer: {
    height: Dimensions.get('window').height / 2.5,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  city: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#f7f7f7',
  },
  tempText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#f7f7f7',
  },
  rainContainer: {
    borderTopWidth: 0.5,
    borderTopColor: '#f8f9fa',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 40,
    padding: 7,
  },
  headingTemp: { fontWeight: 'bold', fontSize: 18, color: '#f7f7f7' },
})

export default Home
