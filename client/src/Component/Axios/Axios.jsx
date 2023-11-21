import axios from "axios";

const api = axios.create({
  baseURL: "https://aktech.onrender.com",
});

export default api;
