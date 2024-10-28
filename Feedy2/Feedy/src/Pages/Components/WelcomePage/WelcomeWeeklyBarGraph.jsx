import React from "react";
import { Bar } from "react-chartjs-2";

const WelcomeWeeklyBarGraph = ({ calorieData, dailyCalorieNeed }) => {
  const barChartData = {
    labels: calorieData.map((log) => log.date),
    datasets: [
      {
        label: "Calorie Intake",
        data: calorieData.map((log) => log.calories),
        backgroundColor: "rgb(50,94,74)", // Make bars more visible
        borderColor: "rgba(75,192,192,1)", // Border color for bars
        borderWidth: 6, // Thicker border width for bars
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
          weight: 'bold', // Bold tooltip text
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // Larger x-axis font size
            weight: 'bold', // Bold x-axis labels
          },
          color: '#000', // Dark color for x-axis labels
        },
        grid: {
          color: 'rgba(12,12,12,0.29)', // Grid line color for x-axis
        },
      },
      y: {
        beginAtZero: true,
        max: dailyCalorieNeed, // Set the maximum y-axis value to the daily calorie need
        ticks: {
          font: {
            size: 12, // Larger y-axis font size
            weight: 'bold', // Bold y-axis labels
          },
          color: '#000', // Dark color for y-axis labels
        },
        grid: {
          color: 'rgba(12,12,12,0.29)', // Grid line color for y-axis
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 8, // Thicker bars
        backgroundColor: 'rgb(50,94,74)', // Bar fill color
        borderColor: 'rgba(75,192,192,1)', // Bar border color
      },
    },
  };

  return (
      <div>
        <div className="bar-chart">
          <Bar data={barChartData} options={chartOptions} width={800} height={400} />
        </div>
      </div>
  );
};

export default WelcomeWeeklyBarGraph;
