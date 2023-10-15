import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_END_POINT || 'http://localhost:8888/api',
  timeout: 60000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhZGU1YmE0MDg5NjFhNjFkNTEyMmUiLCJuYW1lIjoiaGFpcGh1IiwiY3JlYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwidXBkYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwiX192IjowLCJpYXQiOjE2OTczMDgyNTR9.QRazjfoAigoXS921nk37-lEgq8tZ8CPo1CMKa26BBM0"}`
}

export const sendGet = (url, params) => {
  // const token = Cookies.get('access')
  api.defaults.headers.common.Authorization = `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhZGU1YmE0MDg5NjFhNjFkNTEyMmUiLCJuYW1lIjoiaGFpcGh1IiwiY3JlYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwidXBkYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwiX192IjowLCJpYXQiOjE2OTczMDgyNTR9.QRazjfoAigoXS921nk37-lEgq8tZ8CPo1CMKa26BBM0"}`
  return api.get(url, { params })
}
export const sendPost = (url, params) => {
  // const token = Cookies.get('access')
  api.defaults.headers.common.Authorization = `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhZGU1YmE0MDg5NjFhNjFkNTEyMmUiLCJuYW1lIjoiaGFpcGh1IiwiY3JlYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwidXBkYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwiX192IjowLCJpYXQiOjE2OTczMDgyNTR9.QRazjfoAigoXS921nk37-lEgq8tZ8CPo1CMKa26BBM0"}`
  return api.post(url, params)
}
export const sendPatch = (url, params) => {
  // const token = Cookies.get('access')
  api.defaults.headers.common.Authorization = `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhZGU1YmE0MDg5NjFhNjFkNTEyMmUiLCJuYW1lIjoiaGFpcGh1IiwiY3JlYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwidXBkYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwiX192IjowLCJpYXQiOjE2OTczMDgyNTR9.QRazjfoAigoXS921nk37-lEgq8tZ8CPo1CMKa26BBM0"}`
  return api.patch(url, params)
}
export const sendDelete = (url, params) => {
  // const token = Cookies.get('access')
  api.defaults.headers.common.Authorization = `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhZGU1YmE0MDg5NjFhNjFkNTEyMmUiLCJuYW1lIjoiaGFpcGh1IiwiY3JlYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwidXBkYXRlZEF0IjoiMjAyMy0xMC0xNFQxODozMDo1MS4xMTVaIiwiX192IjowLCJpYXQiOjE2OTczMDgyNTR9.QRazjfoAigoXS921nk37-lEgq8tZ8CPo1CMKa26BBM0"}`
  return api.delete(url, params)
}
