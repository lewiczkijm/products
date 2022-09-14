import axios from "axios";
export const BASE_URL = `http://${window.location.hostname}:8081`;
// fetching data api
const Axios = axios.create({
  baseURL: BASE_URL,
});

export { Axios };
