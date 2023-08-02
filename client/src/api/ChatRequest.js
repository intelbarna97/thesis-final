import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.1.107:5000" });

export const userChats = (id) => API.get(`/chat/getChats/${id}`);
export const findChat = (firstId, secondId) =>
  API.get(`/chat/find/${firstId}/${secondId}`);
export const createChat = (chat) => API.post("/chat/", chat);
