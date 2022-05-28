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

export default {
  addAlarm,
};
