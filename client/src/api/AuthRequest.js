import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.1.107:5000" });

export const logIn = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);