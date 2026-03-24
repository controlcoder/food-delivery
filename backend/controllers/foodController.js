import FoodModel from "../models/foodModel.js";
import uploadToCloudinary from "../helper/cloudinary.js";
import cloudinary from "../config/cloudinary.js";

const addFood = async (req, res) => {

  const { public_id, secure_url } = await uploadToCloudinary(req.file.buffer);

  const food = new FoodModel({
    ...req.body,
    image_url: secure_url,
    image_public_id: public_id,
  });

  try {
    await food.save();
    return res.json({ success: true, message: "Food added" });
  } catch (err) {
    return res.json({
      success: false,
      message: `something went wrong, ${err.message}`,
    });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    return res.json({ success: true, foods });
  } catch (err) {
    return res.json({
      success: false,
      message: `something went wrong, ${err.message}`,
    });
  }
};

const removeFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const food = await FoodModel.findByIdAndDelete(foodId);
    await cloudinary.uploader.destroy(food.image_public_id);
    return res.json({ success: true, message: "Food removed" });
  } catch (err) {
    return res.json({
      success: false,
      message: `something went wrong, ${err.message}`,
    });
  }
};

export { addFood, listFood, removeFood };
