import { sendGet, sendPatch, sendPost, sendDelete } from './axiosIntance'

export const apiLogin = (account) => sendPost('users/sign-in', account)
