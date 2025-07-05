import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // adjust if Django runs elsewhere
});

export default api;
