import axios from 'axios'

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials:true
})

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.assign('/')
    }
    return Promise.reject(error)
  }
)

//users

//battles
const sendAttack = (attackData: any) => http.post('/battles/attack', attackData)

const PokemonttService = {
  sendAttack,
}

export default PokemonttService
