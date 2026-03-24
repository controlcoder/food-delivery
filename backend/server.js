import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDB from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

connectToDB();

app.get("/", (req, res) => {
  return res.json({ message: "api is working" });
});

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 8888;

  server.listen(port, () => {
    console.log("server is listening");
  });
}
