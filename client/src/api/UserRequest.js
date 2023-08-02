import axios from "axios";

const API = axios.create({ baseURL: "http://192.168.1.107:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getUser = (data) => API.get(`/user/${data}`);
export const getUserByUsername = (data) => API.get(`/user/${data}/username`);
export const updateUser = (id, data) => API.put(`/user/${id}`, data);
export const getRecommendedUsers = (id) => API.get(`/user/${id}/recommended`);
export const followUser = (id, data) =>
  API.put(`/user/${data}/follow`, { currentUserId: id });
export const unFollowUser = (id, data) =>
  API.put(`/user/${data}/unfollow`, { currentUserId: id });
export const searchUser = (searchData) => API.get(`/user/${searchData}/search`);
export const getNofitications = (id) => API.get(`/user/${id}/notification`);
export const updateNofitication = (id) => API.put(`/user/${id}/notification`);
