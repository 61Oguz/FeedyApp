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
        borderWidth: 4, // Thicker line
        pointRadius: 6, // Larger points
        borderColor: "rgb(6,35,35)", // Border color for bars
        pointColor : "rgb(117,234,176)", // Border color for bars
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Calorie Intakes of the Last Seven Days",
        font: {
          size: 20, // Larger title font
          weight: 'bold', // Bold title
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const percentage = ((context.raw / dailyCalorieNeed) * 100).toFixed(2);
            return `${context.raw} calories (${percentage}%)`;
          },
        },
        bodyFont: {
          weight: 'bold', // Bold text in tooltip
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // Larger font size for x-axis labels
            weight: 'bold', // Make x-axis labels bold
          },
          color: '#000', // Black color for x-axis labels
        },
        grid: {
          color: 'rgba(12,12,12,0.29)', // Grid line color for y-axis
        },
      },
      y: {
        beginAtZero: true,
        max: dailyCalorieNeed,
        ticks: {
          font: {
            size: 12, // Larger font size for y-axis labels
            weight: 'bold', // Make y-axis labels bold
          },
          color: '#000', // Black color for y-axis labels
        },
        grid: {
          color: 'rgba(12,12,12,0.29)', // Grid line color for y-axis
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1, // Thicker line width
      },
      point: {
        radius: 1, // Larger points
        backgroundColor: 'rgb(117,234,176)', // Color for points
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
