import { createContext, useEffect, useState } from "react";

import { listFood } from "../api/foodApi";
import {
  addToCartAPI,
  getCartItemsAPI,
  removeFromCartAPI,
} from "../api/cartApi";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    const response = await listFood();

    if (response.success) {
      setFoodList(response.foods);
    }
  };
  const loadCartList = async () => {
    const response = await getCartItemsAPI();
    if (response.success) {
      setCartItems(response.cartData);
    }
  };

  useEffect(() => {
    fetchFoodList();
    loadCartList();
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    await addToCartAPI(itemId);
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    await removeFromCartAPI(itemId);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let item_info = food_list.find((product) => product._id === item);
        totalAmount += item_info.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
