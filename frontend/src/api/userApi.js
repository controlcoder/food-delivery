import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api/user`,
  withCredentials: true,
});

const userLogin = async (data) => {
  try {
    const res = await api.post(`/login`, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

const userRegister = async (data) => {
  try {
    const res = await api.post(`/register`, data);
    return res.data;
  } catch (err) {
    return err;
  }
};

const userLogout = async () => {
  try {
    const res = await api.post(`/logout`);
    return res.data;
  } catch (err) {
    return false;
  }
};

export { userLogin, userRegister, userLogout };
