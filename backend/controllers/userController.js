import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({ success: true, token });
  } catch (err) {
    return res.json({
      success: false,
      message: `something went wrong, ${err.message}`,
    });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await UserModel.findOne({ email });
    if (exists)
      return res.json({ success: false, message: "user already exists" });

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({ success: true, token });
  } catch (err) {
    return res.json({
      success: false,
      message: `something went wrong, ${err.message}`,
    });
  }
};

const handleLogout = async (req, res) => {
  try {
    
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    return res.json({ success: true, message: "logout successfully" });
  } catch (err) {
    return res.json({
      success: false,
      message: `something went wrong, ${err.message}`,
    });
  }
};

export { loginUser, registerUser, handleLogout };
