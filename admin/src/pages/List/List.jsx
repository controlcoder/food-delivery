import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "./List.css";
import { listFood, removeFood } from "../../api/foodApi";

export default function List() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await listFood();
    if (response.success) {
      setList(response.foods);
    } else {
      toast.error("Error");
    }
  };

  const removeFromList = async (foodId) => {
    const response = await removeFood(foodId);
    if (response.success) {
      fetchList();
      toast.success(response.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, idx) => {
          return (
            <div key={idx} className="list-table-format">
              <img src={item.image_url} alt="food-img" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <span onClick={() => removeFromList(item._id)}>X</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
