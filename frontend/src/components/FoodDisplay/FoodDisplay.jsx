import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

export default function FoodDisplay({ category: global_category }) {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map(({ _id, name, price, description, category, image_url }) => {
          if (global_category === "All" || global_category === category)
            return (
              <FoodItem
                key={_id}
                id={_id}
                name={name}
                price={price}
                description={description}
                image={image_url}
              />
            );
        })}
      </div>
    </div>
  );
}
