import axios from 'axios'
import { apiUrl } from '../config.json'
import querystring from 'querystring'
import jwtDecode from 'jwt-decode'
import { auth_username, auth_password } from '../config.json'

let bearer_token = localStorage.getItem('access_token')

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${bearer_token}` },
})

// axiosInstance.interceptors.request.use(async (req) => {

//     if (!bearer_token) {
//         bearer_token = localStorage.getItem("access_token");
//         req.headers.Authorization = `Bearer ${bearer_token}`;
//     }

//     if (bearer_token) {
//         bearer_token = localStorage.getItem('access_token');
//         const user = jwtDecode(bearer_token);
//         // const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

// if (!isExpired) {
//     req.headers.Authorization = `Bearer ${bearer_token}`;
//     return req;
// }

// const old_refresh_token = localStorage.getItem("refresh_token");

// try {
//     const rs = await axios.post(
//         apiUrl + "/oauth/token",
//         querystring.stringify({
//             grant_type: "refresh_token",
//             refresh_token: old_refresh_token,
//         }),
//         { auth: { username: auth_username, password: auth_password } }
//     );

//     const { access_token, refresh_token } = rs.data;
//     console.log("**********************", rs);
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");

//     localStorage.setItem("access_token", access_token);
//     localStorage.setItem("refresh_token", refresh_token);

//     bearer_token = access_token;
//     req.headers.Authorization = `Bearer ${bearer_token}`;

//     console.log("bearer_token", req.headers.Authorization);
// } catch (_error) {
//     // logout();
//     return Promise.reject(_error);
// }
//     }

//     return req;
// });

// axiosInstance.interceptors.response.use(null, async (error) => {
//     const expectedError =
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status < 500;

//     if (!expectedError) {
//         console.log("logging for error");
//     }
//     return Promise.reject(error);
// });

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  patch: axiosInstance.patch,
}
