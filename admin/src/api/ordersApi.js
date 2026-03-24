import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api/order`,
  // withCredentials: true,
});

const listOrders = async () => {
  try {
    const res = await api.get(`/list`);
    return res.data;
  } catch (err) {
    return err;
  }
};

const orderStatus = async (status, orderId) => {
  try {
    const res = await api.post(`/status/${orderId}`, { status });
    return res.data;
  } catch (err) {
    return err;
  }
};

export { listOrders, orderStatus };
