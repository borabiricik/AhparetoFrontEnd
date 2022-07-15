import axios from "axios";

export const apiUrl = "http://localhost:3000";
// export const apiUrl = "https://app.ahpareto.com/api/";

export const nodeAPI = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://nodeapi.ahpareto.com/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
