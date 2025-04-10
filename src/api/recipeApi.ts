import axios from "axios";
const API_URL = "http://localhost:3001";

export const fetchRecipes = () => axios.get(`${API_URL}/recipes`);
export const fetchRecipe = (id: number) => axios.get(`${API_URL}/recipes/${id}`);
export const addRecipe = (data: any) => axios.post(`${API_URL}/recipes`, data);
export const updateRecipe = (id: number, data: any) =>
    axios.put(`${API_URL}/recipes/${id}`, data);
export const deleteRecipe = (id: number) =>
    axios.delete(`${API_URL}/recipes/${id}`);
