import 'querystring'
import http from '../httpService'
import { apiUrl } from '../../config.json'
import Auth from '../user/authService'

export async function getAllMachines() {
  const apiEndPoint = apiUrl + '/v1/machine/all'
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function addMachine(data) {
  const apiEndPoint = apiUrl + '/v1/machine/add'
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function getMachineTypes() {
  const apiEndPoint = apiUrl + '/v1/machine-type/all'
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function editMachineView(id) {
  const apiEndPoint = apiUrl + '/v1/machine/details/' + id
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function saveMachineView(data, id) {
  const apiEndPoint = apiUrl + '/v1/machine/edit/' + id
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function deleteMachine(id) {
  const apiEndPoint = apiUrl + '/v1/machine/delete/' + id
  const response = await http.delete(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function addInitialRates(data) {
  const apiEndPoint = apiUrl + '/v1/connected-machine/edit'
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function getRates(data) {
  const apiEndPoint = apiUrl + '/v1/connected-machine/rate'
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function getPossibleConnectionIDs(id) {
  const apiEndPoint = apiUrl + '/v1/connected-machine/possible/' + id
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  console.log('Connected Machine IDs', response)
  return response
}

export async function getAllMachinesByType(data) {
  const apiEndPoint = apiUrl + '/v1/machine/get-by-type/' + data
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function getDemoDetails() {
  const apiEndPoint = apiUrl + '/v1/machine/get-by-line'
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function addRates(data) {
  const apiEndPoint = apiUrl + '/v1/rates/add'
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function checkIsUnique(slug) {
  const apiEndPoint = apiUrl + '/v1/machine/unique/' + slug
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export async function getIdList() {
  const apiEndPoint = apiUrl + '/v1/machine/id-list'
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  })

  return response
}

export default {
  getAllMachines,
  addMachine,
  getMachineTypes,
  editMachineView,
  saveMachineView,
  deleteMachine,
  addInitialRates,
  getPossibleConnectionIDs,
  getRates,
  getAllMachinesByType,
  getDemoDetails,
  addRates,
  checkIsUnique,
  getIdList,
}
