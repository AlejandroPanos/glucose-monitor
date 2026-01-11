/* Create imports */
import axios from "axios";

/* Configure axios */
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

/* Create helpers */
// Admin helpers
export const getUsers = async () => {
  const response = await axios.get("/api/admin/users");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`/api/admin/users/${id}`);
  return response.data;
};

//Auth helpers
export const checkAuth = async () => {
  const response = await axios.get("/api/auth/profile");
  return response.data;
};

export const updateProfile = async (updatedUser) => {
  console.log(updatedUser);
  const response = await axios.post("/api/auth/profile", updatedUser);
  return response.data;
};

export const userRegister = async (user) => {
  const response = await axios.post("/api/auth/register", user);
  return response.data;
};

export const userLogin = async (user) => {
  const response = await axios.post("/api/auth/login", user);
  return response.data;
};

export const userLogout = async () => {
  const response = await axios.post("/api/auth/logout");
  return response.data;
};

//Action helpers
// * === MEALS === *
export const userMeals = async (page = 1, limit = 10) => {
  const response = await axios.get(`/api/meals?page=${page}&limit=${limit}`);
  return response.data;
};

export const addMeal = async (meal) => {
  const response = await axios.post("/api/meals", meal);
  return response.data;
};

export const getMeal = async (id) => {
  const response = await axios.get(`/api/meals/${id}`);
  return response.data;
};

export const editMeal = async ({ id, updatedMeal }) => {
  const response = await axios.put(`/api/meals/${id}`, updatedMeal);
  return response.data;
};

export const deleteMeal = async (id) => {
  const response = await axios.delete(`/api/meals/${id}`);
  return response.data;
};

// * === LOGS === *
export const userLogs = async (page = 1, limit = 10) => {
  const response = await axios.get(`/api/logs?page=${page}&limit=${limit}`);
  return response.data;
};

export const addLog = async (log) => {
  const response = await axios.post("/api/logs", log);
  return response.data;
};

export const getLog = async (id) => {
  const response = await axios.get(`/api/logs/${id}`);
  return response.data;
};

export const editLog = async ({ id, updatedLog }) => {
  console.log(updatedLog);
  const response = await axios.put(`/api/logs/${id}`, updatedLog);
  return response.data;
};

export const deleteLog = async (id) => {
  const response = await axios.delete(`/api/logs/${id}`);
  return response.data;
};
