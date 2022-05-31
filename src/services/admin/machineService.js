import "querystring";
import http from "../httpService";
import { apiUrl } from "../../config.json";
import Auth from "../user/authService";

export async function getAllMachines() {
  console.log("add machine data");

  const apiEndPoint = apiUrl + "/v1/machine/all";
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("view machine", response);
  return response;
}

export async function addMachine(data) {
  console.log("add Machine data", data);

  const apiEndPoint = apiUrl + "/v1/machine/add";
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("add machine", response);
  return response;
}

export async function getMachineTypes() {
  console.log("Machine Types");

  const apiEndPoint = apiUrl + "/v1/machine-type/all";
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("Machine Types", response);
  return response;
}

export async function editMachineView(id) {
  console.log("Edit Machine");

  const apiEndPoint = apiUrl + "/v1/machine/details/"+id;
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("Edit Machine", response);
  return response;
}

export async function saveMachineView(data, id) {
  console.log("save Machine data", data);

  const apiEndPoint = apiUrl + "/v1/machine/edit/"+id;
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("save machine", response);
  return response;
}

export async function deleteMachine(id) {
  const apiEndPoint = apiUrl + "/v1/machine/delete/" + id;
  const response = await http.delete(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("machine deleted", response);
  return response;
}

export async function addInitialRates(data) {
  console.log("add Initial Rates", data);

  const apiEndPoint = apiUrl + "/v1/connected-machine/edit";
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("add initial Rates", response);
  return response;
}

export async function getRates(data) {
  console.log("add Initial Rates", data);

  const apiEndPoint = apiUrl + "/v1/connected-machine/rate";
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("add initial Rates", response);
  return response;
}

export async function getPossibleConnectionIDs(id) {
  console.log("Connected Machine IDs");

  const apiEndPoint = apiUrl + "/v1/connected-machine/possible/"+id;
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("Connected Machine IDs", response);
  return response;
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
  getRates
};
