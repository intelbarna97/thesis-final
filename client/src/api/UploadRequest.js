import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.1.107:5000" });

export const uploadImage = (data) => API.post("/upload", data);
export const uploadPost = (post) => API.post("/post", post);
export const updateComment = (id, post) =>
  API.put(`/post/${post}/comments`, { commentId: id });
