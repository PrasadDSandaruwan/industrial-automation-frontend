import "querystring";
import http from "../httpService";
import { apiUrl } from "../../config.json";
import Auth from "../user/authService";

export async function getProductionLinesID() {
  const apiEndPoint = apiUrl + "/v1/production-line/all";
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  return response;
}

export async function addProductionLine(data) {
  const apiEndPoint = apiUrl + "/v1/production-line/add";
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  return response;
}
export async function checkIsUnique(slug) {
  const apiEndPoint = apiUrl + "/v1/production-line/unique/" + slug;
  const response = await http.get(apiEndPoint, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  return response;
}

export default {
  getProductionLinesID,
  addProductionLine,
  checkIsUnique,
};
