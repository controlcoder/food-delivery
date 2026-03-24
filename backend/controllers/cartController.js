import UserModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const itemId = req.body.itemId;

    await UserModel.findByIdAndUpdate(req.userId, {
      $inc: { [`cartData.${itemId}`]: 1 },
    });

    return res.json({ success: true, message: "Item added to cart" });
  } catch (err) {
    return res.json({
      success: false,
      message: `Something went wrong, ${err.message}`,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const user = await UserModel.findById(req.userId);

    if (!user.cartData?.[itemId]) {
      return res
        .status(400)
        .json({ success: false, message: "Item is not in cart" });
    }
    if (user.cartData[itemId] > 1) {
      await UserModel.findByIdAndUpdate(req.userId, {
        $inc: { [`cartData.${itemId}`]: -1 },
      });
    } else {
      await UserModel.findByIdAndUpdate(req.userId, {
        $unset: { [`cartData.${itemId}`]: "" },
      });
    }
    
    return res.json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    return res.json({
      success: false,
      message: `Something went wrong, ${err.message}`,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    const cartData = await user.cartData;
    return res.json({ success: true, cartData });
  } catch (err) {
    return res.json({
      success: false,
      message: `Something went wrong, ${err.message}`,
    });
  }
};

export { addToCart, removeFromCart, getCart };
