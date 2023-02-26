import axios from 'axios'

function getDog() {
  return axios.get('https://dog.ceo/api/breeds/image/random')
}

export default getDog
