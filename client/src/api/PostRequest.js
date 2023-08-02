import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.1.107:5000" });

export const getTimelinePosts = (id) => API.get(`post/${id}/timeline`);
export const getUserPosts = (id) => API.get(`post/${id}/user`);
export const getComments = (id) => API.get(`post/${id}/comments`);
export const getPost = (id) => API.get(`post/${id}`);
export const updatePost = (id, data) => API.put(`post/${id}`, data);
export const updateComments = (id, data) =>
  API.put(`post/${id}/comments`, data);
export const getTrendingTopics = (id) => API.get(`post/${id}/trending`);
export const getTopicPosts = (id) => API.get(`post/${id}/topicposts`);
export const topicSearch = (id) => API.get(`post/${id}/topicSearch`);
