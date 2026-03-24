import "./Navbar.css";

import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { userLogout } from "../../api/userApi";

export default function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");

  const { token, setToken, getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await userLogout();
    if (response.success) {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search_icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>
          <div className={getTotalCartAmount() ? "dot" : ""}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile-icon" />
            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="orders" />
                Orders
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.bag_icon} alt="logout" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
