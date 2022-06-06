import "querystring";
import http from "../httpService";
import { apiUrl } from "../../config.json";
import Auth from "../user/authService";

export async function getRates(data) {
  console.log("add machine data");
  const apiEndPoint = apiUrl + "/v1/rates/get-rates";
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });
  console.log("view machine", response);
  return response;
}

export default{
  getRates,
};