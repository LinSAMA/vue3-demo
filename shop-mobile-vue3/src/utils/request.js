import axios from 'axios'

const request = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api',
  timeout: 2 * 1000
})

export default request
