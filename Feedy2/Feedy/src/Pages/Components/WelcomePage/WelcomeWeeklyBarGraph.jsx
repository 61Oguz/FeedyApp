import React from "react";
import { Bar } from "react-chartjs-2";

const WelcomeWeeklyBarGraph = ({ calorieData, dailyCalorieNeed }) => {
  const barChartData = {
    labels: calorieData.map((log) => log.date),
    datasets: [
      {
        label: "Calorie Intake",
        data: calorieData.map((log) => log.calories),
        backgroundColor: "rgb(50,94,74)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 6,
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
      bar: {
        borderWidth: 8,
        backgroundColor: "rgb(50,94,74)",
        borderColor: "rgba(75,192,192,1)",
      },
    },
  };

  return (
    <div>
      <div className="bar-chart">
        <Bar
          data={barChartData}
          options={chartOptions}
          width={800}
          height={400}
        />
      </div>
    </div>
  );
};

export default WelcomeWeeklyBarGraph;
