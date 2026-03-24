import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api/cart`,
  withCredentials: true,
});

const addToCartAPI = async (itemId) => {
  try {
    const res = await api.post(`/add`, { itemId });
    return res.data;
  } catch (err) {
    return err;
  }
};

const removeFromCartAPI = async (itemId) => {
  try {
    const res = await api.delete(`/remove`, {
      data: { itemId },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const getCartItemsAPI = async () => {
  try {
    const res = await api.get(`/get`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export { addToCartAPI, removeFromCartAPI, getCartItemsAPI };
