import { useState, useContext } from "react";

import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { userLogin, userRegister } from "../../api/userApi";
import { StoreContext } from "../../context/StoreContext";

export default function LoginPopup({ setShowLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const { setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let response;
    if(isLogin) response = await userLogin(data);
    else response = await userRegister(data);
    if (response.success) {
      setToken(response.token);
      localStorage.setItem("token", response.token);
      setShowLogin(false);
      alert("User logged in");
    } else {
      alert("Something went wrong, cannot logged in");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmitHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{isLogin ? "Login here" : "Sign Up"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close-icon"
          />
        </div>
        <div className="login-popup-inputs">
          {isLogin ? (
            <></>
          ) : (
            <input
              type="text"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              name="name"
              required
            />
          )}
          <input
            type="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            name="email"
            required
          />
          <input
            type="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Your password"
            name="password"
            required
          />
        </div>
        {!isLogin && (
          <div className="login-popup-cond">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}
        <button type="submit">{isLogin ? "Login" : "Create account"}</button>
        <div className="switch">
          {isLogin ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setIsLogin(false)}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
