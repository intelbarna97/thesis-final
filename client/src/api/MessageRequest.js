import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.1.107:5000" });

export const getMessages = (id) => API.get(`/message/${id}`);
export const addMessage = (messageData) => API.post(`/message/`, messageData);
