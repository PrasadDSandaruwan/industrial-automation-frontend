import 'querystring'
import jwtDecode from 'jwt-decode'
import http from '../httpService'
import { apiUrl, auth_username, auth_password } from '../../config.json'

const querystring = require('querystring')

const apiEndpoint = apiUrl + '/oauth/token'

export async function login(email, password) {
  

  const response = await http.post(
    apiEndpoint,
    querystring.stringify({
      username: email,
      password: password,
      grant_type: 'password',
    }),
    {
      auth: {
        username: auth_username,
        password: auth_password,
      },
    },
  )
  const data = response.data
  return response
}

function loginWithJwt(access_token, refresh_token) {

  localStorage.setItem('access_token', access_token)
  localStorage.setItem('refresh_token', refresh_token)

}

function setForcePassword(force_change) {
  localStorage.setItem('force_change',force_change)
}


export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('access_token')
    const user = jwtDecode(jwt)


    return user
  } catch (ex) {
    return null
  }
}

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('force_change')
}

export function getJwt() {
  return localStorage.getItem('access_token')
}

export function getForcePassword() {
  return localStorage.getItem('force_change')
}

export function getUserRole() {
  const user = getCurrentUser()
  return user.authorities[0]
}



export default {
  login,
  loginWithJwt,
  getCurrentUser,
  logout,
  getJwt,
  getUserRole,
  setForcePassword,
  getForcePassword,
}
