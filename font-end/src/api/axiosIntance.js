import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_END_POINT || 'http://localhost:8888/api',
  timeout: 60000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

const token = localStorage.getItem('access_token');
api.defaults.headers.common.Authorization = `Bearer ${token}`

export const sendGet = (url, params) => {
  return api.get(url, { params })
}
export const sendPost = (url, params) => {
  return api.post(url, params)
}
export const sendPatch = (url, params) => {
  return api.patch(url, params)
}
export const sendDelete = (url, params) => {
  return api.delete(url, params)
}
