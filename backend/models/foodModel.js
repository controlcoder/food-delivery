import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  image_public_id: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const FoodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default FoodModel;
