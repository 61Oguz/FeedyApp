import React, { forwardRef } from "react";
import { Pie } from "react-chartjs-2";

const PrintableFoodLog = forwardRef((props, ref) => {
  const {
    foodLogs,
    date,
    totalCalories,
    totalProtein,
    totalFat,
    totalCarbs,
    data,
    options,
  } = props;

  return (
    <div
      ref={ref}
      style={{ padding: "20px", backgroundColor: "white", color: "black" }}
    >
      <div>
        <h3>Food Logs for {date}</h3>
        <ul>
          {foodLogs.map((log) => (
            <li key={log.foodId}>
              {log.foodName} - {log.calories} calories - {log.protein}g protein
              - {log.fat}g fat - {log.carbs}g carbs - {log.portionSize}x portion
            </li>
          ))}
        </ul>
        <h4>Total Calories: {totalCalories}</h4>
        <h4>Total Protein: {totalProtein}g</h4>
        <h4>Total Fat: {totalFat}g</h4>
        <h4>Total Carbs: {totalCarbs}g</h4>
      </div>
      <div>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
});

export default PrintableFoodLog;
