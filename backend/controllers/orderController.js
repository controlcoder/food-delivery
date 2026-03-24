import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body.orderData;

    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 90,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 90,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false&orderId=${newOrder._id}`,
    });

    return res.json({ success: true, session_url: session.url });
  } catch (err) {
    return res.json({
      success: false,
      message: `Something went wrong, ${err.message}`,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Paid" });
    }
    await OrderModel.findOneAndDelete(orderId);
    return res.json({ success: false, message: "Not Paid" });
  } catch (err) {
    return res.json({
      success: false,
      message: `Something went wrong, ${err.message}`,
    });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.userId });
    return res.json({ success: true, orders });
  } catch (err) {
    return res.json({
      success: false,
      message: `Something went wrong, ${err.message}`,
    });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    return res.json({ success: true, orders });
  } catch (err) {
    return res.json({
      success: false,
      message: `Something went wrong, ${err.message}`,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    await OrderModel.findByIdAndUpdate(req.params.orderId, {
      status: req.body.status,
    });
    return res.json({ success: true, message: "status updated" });
  } catch (err) {
    return res.json({
      success: false,
      message: `Something went wrong, ${err.message}`,
    });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
