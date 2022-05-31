import "querystring";
import http from "../httpService";
import { apiUrl } from "../../config.json";
import Auth from "../user/authService";

export async function getProductionLinesID() {
    console.log("production Line IDs");
  
    const apiEndPoint = apiUrl + "/v1/production-line/all";
    const response = await http.get(apiEndPoint, {
      headers: { Authorization: `Bearer ${Auth.getJwt()}` },
    });
  
    console.log("Production Line IDs", response);
    return response;
}


export async function addProductionLine(data) {
  console.log("add production Line", data);

  const apiEndPoint = apiUrl + "/v1/production-line/add";
  const response = await http.post(apiEndPoint, data, {
    headers: { Authorization: `Bearer ${Auth.getJwt()}` },
  });

  console.log("add production line", response);
  return response;
}


  

  export default {
    getProductionLinesID,
    addProductionLine
  };