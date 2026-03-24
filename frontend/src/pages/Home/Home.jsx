import "./Home.css"

import Header from "../../components/Header/Header"
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu"
import { useState } from "react"
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

export default function Home() {
  const [category, setCategory]=useState("All");
  return (
    <>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </>
  )
}
