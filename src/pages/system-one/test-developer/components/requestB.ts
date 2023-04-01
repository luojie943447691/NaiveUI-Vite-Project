import axios from 'axios'

export function requestB() {
  return axios.get('./b.hash')
}
