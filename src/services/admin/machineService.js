import "querystring";
import http from "../httpService";
import { apiUrl } from "../../config.json";
import Auth from "../user/authService";

export async function getAllMachines() {
  console.log("add alarm data");

  const apiEndPoint = apiUrl + "/v1/machine/all";
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("add alarm", response);
  return response;
}

export default {
  getAllMachines,
};
