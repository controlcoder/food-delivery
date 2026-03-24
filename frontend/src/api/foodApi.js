import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api/food`,
  // withCredentials: true,
});

const listFood = async () => {
  try {
    const res = await api.get(`/list`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export { listFood };
