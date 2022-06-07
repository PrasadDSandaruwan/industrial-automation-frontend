import "querystring";
import http from "../httpService";
import { apiUrl } from "../../config.json";
import Auth from "../user/authService";

export async function addAlarm(data) {
  const apiEndPoint = apiUrl + "/v1/alarm/add";
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  return response;
}

export async function getAlarmDetails(id) {
  const apiEndPoint = apiUrl + "/v1/alarms/details/" + id;
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  return response;
}

export async function editAlarm(data, id) {
  const apiEndPoint = apiUrl + "/v1/alarm/edit/" + id;
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  return response;
}

export async function getAllAlarm() {
  const apiEndPoint = apiUrl + "/v1/alarm/all";
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  return response;
}
export async function deleteAlarm(id) {
  const apiEndPoint = apiUrl + "/v1/alarm/delete/" + id;
  const response = await http.delete(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  return response;
}

export async function checkIsUnique(slug) {
  const apiEndPoint = apiUrl + "/v1/alarms/unique/" + slug;
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  return response;
}

export default {
  addAlarm,
  getAlarmDetails,
  editAlarm,
  getAllAlarm,
  deleteAlarm,
  checkIsUnique,
};
