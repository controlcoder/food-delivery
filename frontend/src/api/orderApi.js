import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api/order`,
  withCredentials: true,
});

const placeOrderAPI = async (orderData) => {
  try {
    const res = await api.post(`/place`, { orderData });
    return res.data;
  } catch (err) {
    return err;
  }
};

const verifyPaymentAPI = async (success, orderId) => {
  try {
    const res = await api.post(
      `/verify`,
      { success, orderId },
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

const fetchOrdersAPI = async () => {
  try {
    const res = await api.get(`/userorders`);
    // console.log(res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

export { placeOrderAPI, verifyPaymentAPI, fetchOrdersAPI };
