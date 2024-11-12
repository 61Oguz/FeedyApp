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
        tension: 0.1,
        borderWidth: 4,
        pointRadius: 6,
        borderColor: "rgb(6,35,35)",
        pointColor: "rgb(117,234,176)",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Calorie Intakes of the Last Seven Days",
        font: {
          size: 20,
          weight: "bold",
        },
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
        bodyFont: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
          color: "#000",
        },
        grid: {
          color: "rgba(12,12,12,0.29)",
        },
      },
      y: {
        beginAtZero: true,
        max: dailyCalorieNeed,
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
          color: "#000",
        },
        grid: {
          color: "rgba(12,12,12,0.29)",
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1,
      },
      point: {
        radius: 1,
        backgroundColor: "rgb(117,234,176)",
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
