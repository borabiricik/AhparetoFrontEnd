import axios from "axios";

export const apiUrl = "https://app.ahpareto.com/api/";

export const nodeAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
