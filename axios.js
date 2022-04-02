import axios from 'axios';

export function initAxios() {
  return axios.create({
    timeout: 10 * 1000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
