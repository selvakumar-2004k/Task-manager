import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-api-bz39.onrender.com/api",
 
});

export default api;