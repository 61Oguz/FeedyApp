import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import useAuth from "../../../Hooks/useAuth.jsx";

const WelcomeWeeklyLineGraph = ({ calorieData, dailyCalorieNeed }) => {
  const lineChartData = {
    labels: calorieData.map((log) => log.date),
    datasets: [
      {
        label: "Daily Calorie Intake",
        data: calorieData.map((log) => log.calories),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Calorie Intakes of the Last Seven Days",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const percentage = ((context.raw / dailyCalorieNeed) * 100).toFixed(
              2,
            );
            return `${context.raw} calories (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: dailyCalorieNeed, // Set the maximum y-axis value to the daily calorie need
      },
    },
  };

  return (
    <div>
      <div className="line-chart">
        <Line
          data={lineChartData}
          options={chartOptions}
          width={800}
          height={400}
        />
      </div>
    </div>
  );
};

export default WelcomeWeeklyLineGraph;
