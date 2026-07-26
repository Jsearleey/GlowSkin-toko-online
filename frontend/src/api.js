import axios from "axios";

const API_BASE = "https://glowskin-toko-online-production.up.railway.app/api";

export const getProducts = () => axios.get(`${API_BASE}/products`);
export const getProductById = (id) => axios.get(`${API_BASE}/products/${id}`);
export const createProduct = (data) => axios.post(`${API_BASE}/products`, data);
export const updateProduct = (id, data) => axios.put(`${API_BASE}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_BASE}/products/${id}`);

export const registerUser = (data) => axios.post(`${API_BASE}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_BASE}/auth/login`, data);