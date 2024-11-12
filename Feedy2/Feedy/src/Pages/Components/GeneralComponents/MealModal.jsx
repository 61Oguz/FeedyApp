import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "/src/Pages/styles/MealModal.css";

const MealModal = ({ isOpen, onClose, meals, dailyCalorieNeed }) => {
  const modalRef = useRef();

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF();
    const modalCanvas = await html2canvas(modalRef.current);
    const modalImage = modalCanvas.toDataURL("image/png");

    pdf.addImage(modalImage, "PNG", 10, 10, 190, 210);
    pdf.save("meal-list.pdf");
  };

  const getTotalMacros = (mealItems) => {
    return mealItems.reduce(
      (totals, food) => {
        totals.calories += food.calories;
        totals.protein += food.protein;
        totals.fat += food.fat;
        totals.carbs += food.carbs;
        return totals;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 },
    );
  };

  const totalMacros = getTotalMacros(meals.flatMap((meal) => meal.items));

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <h2 className="modal-headers">Meal Plan for the Day</h2>
        <p className="modal-headers">
          Based on your daily calorie need of {dailyCalorieNeed} kcal:
        </p>
        {meals.map((meal, index) => (
          <div key={index} className="meal-section">
            <h3>{meal.name}</h3>
            <ul>
              {meal.items.map((food, foodIndex) => (
                <li key={foodIndex}>
                  {food.name} - {food.calories} kcal (Protein: {food.protein}g,
                  Fat: {food.fat}g, Carbs: {food.carbs}g)
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="total-summary">
          <h3>Total Nutrition for the Day:</h3>
          <p>Total Calories: {totalMacros.calories} kcal</p>
          <p>Total Protein: {totalMacros.protein}g</p>
          <p>Total Fat: {totalMacros.fat}g</p>
          <p>Total Carbs: {totalMacros.carbs}g</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="pdf-download-button-meal"
        >
          Download Meal Plan as PDF
        </button>
        <button onClick={onClose} className="close-button-meal">
          Close
        </button>
      </div>
    </div>
  );
};

export default MealModal;
