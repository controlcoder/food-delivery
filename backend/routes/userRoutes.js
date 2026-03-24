import express from "express";
import { handleLogout, loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", handleLogout);

export default userRouter;
