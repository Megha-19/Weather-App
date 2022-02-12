import { useState } from 'react'
import api from '../api/api'

const useWeather = () => {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [present, setCurrent] = useState([])
  const [city, setCity] = useState([])
  const [hourly, setHourly] = useState([])
  const [days, setDays] = useState([])
  const [max, setMax] = useState([])

  const fetchWeather = async (term) => {
    setLoading(true)
    setError('')

    try {
      const response = await api.get('', {
        params: {
          q: term,
        },
      })
      if (response.data.data.error) {
        const errors = response.data.data.error
          .map((item) => item.msg)
          .join('. ')
        setError(errors)
      } else {
        setResult(response.data.data)
        setCurrent(response.data.data.current_condition)
        setCity(response.data.data.request[0].query)
        setHourly(response.data.data.weather[0].hourly)
        setDays(response.data.data.weather.slice(1))
        setMax(response.data.data.weather[0])
      }
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return {
    fetchWeather,
    result,
    loading,
    error,
    present,
    city,
    hourly,
    days,
    max,
  }
}

export default useWeather
