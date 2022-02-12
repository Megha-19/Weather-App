import axios from 'axios'

export default axios.create({
  baseURL: `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${process.env.API_KEY}&format=json&num_of_days=5&tp=1&showlocaltime=yes`,
})
