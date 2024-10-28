import React from "react";

const UserFeedback = ({
  todayConsumption,
  yesterdayConsumption,
  dailyCalorieNeed,
}) => {
  const calculateFeedback = () => {
    let feedback = "Great job! You are on track.";
    const calorieDifference = dailyCalorieNeed - yesterdayConsumption.calories;

    if (calorieDifference > 0) {
      feedback = `You are ${calorieDifference} calories under your goal. Try to eat a bit more today.`;
    } else if (calorieDifference < 0) {
      feedback = `You are ${Math.abs(calorieDifference)} calories over your goal. Try to eat a bit less today.`;
    }

    return feedback;
  };

  return (
    <div className="user-feedback-box">
      <h3>Yesterday's Values</h3>
      <p>Calories: {yesterdayConsumption.calories} kcal</p>
      <p>Protein: {yesterdayConsumption.protein} g</p>
      <p>Carbs: {yesterdayConsumption.carbs} g</p>
      <p>Fat: {yesterdayConsumption.fat} g</p>
      <h4>Feedback</h4>
      <p>{calculateFeedback()}</p>
    </div>
  );
};

export default UserFeedback;
