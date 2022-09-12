import axios from "axios";

// fetching data api
const Axios = axios.create({
  baseURL: `http://${window.location.hostname}:8081`,
});

export { Axios };
