import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/WelcomePage.css";
import "../styles/SideBar.css";
import DefaultSideBar from "../Components/GeneralComponents/DefaultSideBar.jsx";
import Header from "../Components/GeneralComponents/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import useSidebar from "../../Hooks/useSidebar.jsx";
import WelcomeCompletionGraphs from "../Components/WelcomePage/WelcomeCompletionGraphs.jsx";
import WelcomeWeeklyLineGraph from "../Components/WelcomePage/WelcomeWeeklyLineGraph.jsx";
import WelcomeWeeklyBarGraph from "../Components/WelcomePage/WelcomeWeeklyBarGraph.jsx";
import useMaintenanceCalories from "../../Hooks/useMaintenanceCalories.jsx";
import useConsumptionData from "../../Hooks/useConsumptionData.jsx";
import UserFeedback from "../Components/WelcomePage/UserFeedback.jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import MealModal from "../Components/GeneralComponents/MealModal.jsx"
import {healthyFoods} from "../../assets/HealthyMeals.js";

const WelcomePage = () => {
  const { user, handleLogout } = useAuth();
  const dailyCalorieNeed = useMaintenanceCalories(user);
  const { isSidebarOpen, handleSidebarToggle } = useSidebar();
  const [calorieData, setCalorieData] = useState([]);
  const [completionRate, setCompletionRate] = useState(0);
  const { todayConsumption, yesterdayConsumption } = useConsumptionData(
    user?.userId,
  );
  const [meals, setMeals] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);



  const lineGraphRef = useRef(null);
  const barGraphRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchCalorieData();
    }
  }, [user]);

  const fetchCalorieData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/foodlog/lastsevendays/${user.userId}`,
      );
      const groupedData = groupByDate(response.data);
      setCalorieData(groupedData);
      calculateCompletionRate(groupedData);
    } catch (error) {
      console.error("Error fetching calorie data:", error);
    }
  };

  const groupByDate = (data) => {
    const grouped = data.reduce((acc, log) => {
      const date = log.date;
      if (!acc[date]) {
        acc[date] = { date: date, calories: 0 };
      }
      acc[date].calories += log.calories;
      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
  };

  const calculateCompletionRate = (data) => {
    const totalCalories = data.reduce((total, log) => total + log.calories, 0);
    const targetCalories = dailyCalorieNeed;
    const rate = (totalCalories / targetCalories) * 100;
    setCompletionRate(rate.toFixed(2));
  };

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    const lineGraphCanvas = await html2canvas(lineGraphRef.current);
    const barGraphCanvas = await html2canvas(barGraphRef.current);

    const lineGraphImage = lineGraphCanvas.toDataURL("image/png");
    const barGraphImage = barGraphCanvas.toDataURL("image/png");

    pdf.addImage(lineGraphImage, "PNG", 10, 10, 190, 80); // Adjust position and size
    pdf.addPage(); // Add new page for the next graph
    pdf.addImage(barGraphImage, "PNG", 10, 10, 190, 80); // Adjust position and size

    pdf.save("weekly-graphs.pdf");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const generateRandomMeals = () => {
    // Split daily calories among meals
    const breakfastCalories = Math.round(dailyCalorieNeed * 0.25);
    const lunchCalories = Math.round(dailyCalorieNeed * 0.35);
    const dinnerCalories = Math.round(dailyCalorieNeed * 0.30);
    const snackCalories = Math.round(dailyCalorieNeed * 0.10);

    // Function to randomly pick foods from a specific category to match meal calories
    const generateMeal = (targetCalories, category) => {
      const meal = [];
      let totalCalories = 0;

      while (totalCalories < targetCalories - 100) { // Allow a 100 kcal margin
        // Randomly pick a food from the category
        const randomFood = healthyFoods[category][Math.floor(Math.random() * healthyFoods[category].length)];

        // Check if adding this food will exceed the target calories by more than 100 kcal
        if (totalCalories + randomFood.calories <= targetCalories + 100) {
          meal.push(randomFood);
          totalCalories += randomFood.calories;
        } else {
          break; // Exit if adding the food exceeds the flexible limit
        }
      }

      // Log the total calories for each meal (useful for debugging)
      console.log(`${category} - Total Calories: ${totalCalories}`);
      return meal;
    };

    // Generate meals for breakfast, lunch, dinner, and snacks
    const breakfast = generateMeal(breakfastCalories, 'breakfast');
    const lunch = generateMeal(lunchCalories, 'lunch');
    const dinner = generateMeal(dinnerCalories, 'dinner');
    const snacks = generateMeal(snackCalories, 'snacks');

    // Combine meals and set the state
    setMeals([
      { name: 'Breakfast', items: breakfast },
      { name: 'Lunch', items: lunch },
      { name: 'Dinner', items: dinner },
      { name: 'Snacks', items: snacks },
    ]);

    setModalOpen(true); // Open the modal with the generated meals
  };


  const closeModal = () => setModalOpen(false);
  return (
    <div className="welcome-container">
      <Header logout={handleLogout} user={user} isSidebarOpen={isSidebarOpen} />
      <DefaultSideBar
        user={user}
        logout={handleLogout}
        onToggle={handleSidebarToggle}
      />
      <div className={`main-content ${isSidebarOpen ? "" : "sidebar-closed"}`}>
        <div
          className={`content-wrapper ${isSidebarOpen ? "" : "sidebar-closed"}`}
        >
          <div className="content-box">
            <UserFeedback
              todayConsumption={todayConsumption}
              yesterdayConsumption={yesterdayConsumption}
              dailyCalorieNeed={dailyCalorieNeed}
            />
          </div>
        </div>
        <WelcomeCompletionGraphs
          dailyCalorieNeed={dailyCalorieNeed}
          consumptionData={yesterdayConsumption}
        />
      </div>
      <div className="chart-container">
        <div ref={lineGraphRef}>
          <WelcomeWeeklyLineGraph
            calorieData={calorieData}
            dailyCalorieNeed={dailyCalorieNeed}
          />
        </div>
        <div ref={barGraphRef}>
          <WelcomeWeeklyBarGraph
            calorieData={calorieData}
            dailyCalorieNeed={dailyCalorieNeed}
          />
        </div>
      </div>
      <div className="completion-rate">
        <h3>Welcome to Feedy, {user.userName}!</h3>
      </div>


      <button onClick={generateRandomMeals} className="meal-plan-button">
        Generate Meal Plan
      </button>
      {/* Add the button for PDF download */}
      <button onClick={handleDownloadPDF} className="pdf-download-button">
        PDF
      </button>



      {/* Modal for showing the meal list */}
      <MealModal
          isOpen={isModalOpen}
          onClose={closeModal}
          meals={meals}
          dailyCalorieNeed={dailyCalorieNeed}
      />
    </div>
  );
};

export default WelcomePage;
