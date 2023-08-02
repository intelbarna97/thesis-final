import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.1.107:5000" });

export const likePost = (user_id, post_id) =>
  API.put(`post/${post_id}/like`, { userId: user_id });
