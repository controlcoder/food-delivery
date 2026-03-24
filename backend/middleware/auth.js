import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {

  // const { token } = req.headers;
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized to access this, please login",
    });
  }
  
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded_token.id;

    next();
  } catch (err) {
    return res.json({
      success: false,
      message: `Something went wrong, ${err.message}`,
    });
  }
};

export default authMiddleware;
