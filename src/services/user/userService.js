import 'querystring'
import http from '../httpService'
import { apiUrl } from '../../config.json'
import Auth from '../user/authService'

export async function addUser(data) {
  console.log('add user data', data)

  const apiEndPoint = apiUrl + '/v1/user/add-user'
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  console.log('add user', response)
  return response
}

export async function getUserTypes() {
  console.log('get user types')

  const apiEndPoint = apiUrl + '/v1/machine/all' // ask
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  console.log('get user', response)
  return response
}

export async function changePassword(data) {
  console.log('change password request', data)

  const apiEndPoint = apiUrl + '/v1/user/change-password'
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })
  console.log('change password', response)
  return response
}

export async function forceChangePassword(data) {
  console.log('force change password request', data)

  const apiEndPoint = apiUrl + '/v1/user/first-time-change-password'
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })
  console.log('force change password', response)
  return response
}

export async function getUserDetails() {
  console.log('get user details')

  const apiEndPoint = apiUrl + '/v1/user/user-details'
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  console.log('get user details', response)
  return response
}

export async function updateUserProfile(data) {
  data.birthday = ''
  console.log('update user data', data)

  const apiEndPoint = apiUrl + '/v1/user/update-profile'
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  console.log('update user', response)
  return response
}

export async function getAllUsers() {
  console.log('get all user data')

  const apiEndPoint = apiUrl + '/v1/user/get-all-users'
  const response = await http.post(
    apiEndPoint,
    {},
    { headers: { Authorization: `Bearer ${Auth.getJwt()}` } },
  )

  console.log('get all user', response)
  return response
}

export async function deleteUser(id) {
  console.log('delete user')

  const apiEndPoint = apiUrl + '/v1/user/delete/' + id
  const response = await http.delete(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  console.log('deleted user', response)
  return response
}

export async function checkForcePassword() {
  console.log('check force password')

  const apiEndPoint = apiUrl + '/v1/user/force-password-change'
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  console.log('force password', response)
  return response
}

export async function checkEmailAndNic(data) {
  const apiEndPoint = apiUrl + '/v1/user/unique/' + data
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export default {
  addUser,
  getUserTypes,
  changePassword,
  getUserDetails,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  forceChangePassword,
  checkForcePassword,
  checkEmailAndNic,
}
