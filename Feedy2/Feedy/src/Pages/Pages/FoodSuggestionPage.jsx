import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/FoodSuggestionPage.css";
import DefaultSideBar from "../Components/GeneralComponents/DefaultSideBar.jsx";
import Header from "../Components/GeneralComponents/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";

const FoodSuggestionPage = () => {
  const { user, handleLogout } = useAuth();
  const [foodList, setFoodList] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [caloricGoal, setCaloricGoal] = useState(0);

  useEffect(() => {
    // Calculate user's daily caloric goal (example calculation, you may need to adjust it)
    const calculateCaloricGoal = () => {
      const BMR = 10 * user.weight + 6.25 * user.height - 5 * user.age;
      const maintenanceCalories = BMR * 1.55; // Assuming moderate activity level
      setCaloricGoal(Math.round(maintenanceCalories));
    };

    calculateCaloricGoal();
  }, [user]);

  const fetchFoodData = async () => {
    try {
      const response = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=uDkRCNEx1og7hBgeppz9TWfdcteGAG6PWynpd3iA&query=`,
      );
      return response.data.foods;
    } catch (error) {
      console.error("Error fetching food data:", error);
      return [];
    }
  };

  const generateRandomFoodList = async () => {
    const foods = await fetchFoodData();
    let selectedFoods = [];
    let calories = 0;

    while (calories < caloricGoal && foods.length > 0) {
      const randomIndex = Math.floor(Math.random() * foods.length);
      const selectedFood = foods[randomIndex];
      const foodCalories =
        selectedFood.foodNutrients.find((n) => n.nutrientName === "Energy")
          ?.value || 0;

      if (calories + foodCalories <= caloricGoal) {
        selectedFoods.push(selectedFood);
        calories += foodCalories;
      }

      foods.splice(randomIndex, 1);
    }

    setFoodList(selectedFoods);
    setTotalCalories(calories);
  };

  return (
    <div>
      <DefaultSideBar user={user} logout={handleLogout} />
      <Header logout={handleLogout} user={user} />
      <div className="main-content">
        <h2>Food Suggestions</h2>
        <p>Caloric Goal: {caloricGoal} calories</p>
        <button onClick={generateRandomFoodList}>Generate Food List</button>
        <h3>Total Calories: {totalCalories}</h3>
        <ul>
          {foodList.map((food) => (
            <li key={food.fdcId}>
              {food.description} -{" "}
              {
                food.foodNutrients.find((n) => n.nutrientName === "Energy")
                  ?.value
              }{" "}
              calories
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodSuggestionPage;
