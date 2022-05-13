import axios from 'axios'

const request = axios.create({
  url: '',
  timeout: 2 * 1000
})

export default request
