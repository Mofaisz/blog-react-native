import axios from "axios";
import * as secureStore from "expo-secure-store";

const API = axios.create({
  baseURL: "https://blogapi-using-fastapi.onrender.com",
});

API.interceptors.request.use(async (config) => {
  const token = await secureStore.getItemAsync("userToken");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default API;