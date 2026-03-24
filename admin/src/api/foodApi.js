import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api/food`,
  // withCredentials: true,
});

const addFood = async (formData) => {
  try {
    const res = await api.post(`/add`, formData);
    return res.data;
  } catch (err) {
    return err;
  }
};

const listFood = async () => {
  try {
    const res = await api.get(`/list`);
    return res.data;
  } catch (err) {
    return err;
  }
};

const removeFood = async (foodId) => {
  try {
    const res = await api.delete(`/remove/${foodId}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export { addFood, listFood,removeFood };
