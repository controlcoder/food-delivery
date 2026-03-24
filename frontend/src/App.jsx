import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import NotFound from "./pages/NotFound";
import Layout from "./Layout/Layout";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <>
        <Routes>
          <Route element={<Layout setShowLogin={setShowLogin} />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </>
  );
}
