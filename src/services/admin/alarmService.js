import "querystring";
import http from "../httpService";
import { apiUrl } from "../../config.json";
import Auth from "../user/authService";

export async function addAlarm(data) {
  console.log("add alarm data", data);

  const apiEndPoint = apiUrl + "/v1/alarm/add";
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("add alarm", response);
  return response;
}

export async function getAlarmDetails(id) {
  console.log("get alarm data");

  const apiEndPoint = apiUrl + "/v1/alarms/details/" + id;
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("alarm details", response);
  return response;
}

export async function editAlarm(data, id) {
  console.log("edit alarm data", data);

  const apiEndPoint = apiUrl + "/v1/alarm/edit/" + id;
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("edit alarm", response);
  return response;
}

export async function getAllAlarm() {
  console.log("get alarm data");

  const apiEndPoint = apiUrl + "/v1/alarm/all";
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("get alarms", response);
  return response;
}
export async function deleteAlarm(id) {
  const apiEndPoint = apiUrl + "/v1/alarm/delete/" + id;
  const response = await http.delete(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("alarm deleted", response);
  return response;
}

export async function checkIsUnique(slug) {
  console.log("add machine data");

  const apiEndPoint = apiUrl + "/v1/alarms/unique/" + slug;
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("view machine", response);
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
