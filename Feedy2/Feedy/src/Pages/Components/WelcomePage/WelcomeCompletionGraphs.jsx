import React from "react";
import { Doughnut } from "react-chartjs-2";
import DoughnutCenterTextPlugin from "../../../plugins/DoughnutCenterTextPlugin.js";
import { Chart } from "chart.js";

const WelcomeCompletionGraphs = ({
  dailyCalorieNeed,
  consumptionData,
  styles = {},
}) => {
  const createDoughnutData = (consumed, total) => ({
    labels: ["Consumed", "Remaining"],
    datasets: [
      {
        data: [consumed, total - consumed],
        backgroundColor: ["#FF6384", "#E0E0E0"],
        hoverBackgroundColor: ["#FF6384", "#E0E0E0"],
      },
    ],
  });

  const createDoughnutOptions = (centerText) => ({
    cutout: "80%",
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const percentage = ((value / dailyCalorieNeed) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      doughnutCenterText: {
        centerText: centerText,
      },
    },
  });

  return (
    <div className="main-content" style={styles.mainContent}>
      <div className="Welcome-CalChartWrapper" style={styles.calChartWrapper}>
        <div
          className="Welcome-Completion-Graphs"
          style={styles.completionGraphs}
        >
          <h5 className="Donut-Header" style={styles.donutHeader}>
            Yesterday´s Completion Rates
          </h5>
          <div
            id="doughnutChart"
            className="Welcome-Completion-Graphs1"
            style={styles.completionGraphs1}
          >
            <Doughnut
              data={createDoughnutData(
                consumptionData.calories,
                dailyCalorieNeed,
              )}
              options={createDoughnutOptions("Calorie")}
              plugins={[DoughnutCenterTextPlugin]}
            />
          </div>
          <div
            id="doughnutChart"
            className="Welcome-Completion-Graphs2"
            style={styles.completionGraphs2}
          >
            <Doughnut
              data={createDoughnutData(
                consumptionData.protein * 4,
                dailyCalorieNeed * 0.4,
              )}
              options={createDoughnutOptions("Protein")}
              plugins={[DoughnutCenterTextPlugin]}
            />
          </div>
          <div
            id="doughnutChart"
            className="Welcome-Completion-Graphs3"
            style={styles.completionGraphs3}
          >
            <Doughnut
              data={createDoughnutData(
                consumptionData.carbs * 4,
                dailyCalorieNeed * 0.4,
              )}
              options={createDoughnutOptions("Carb")}
              plugins={[DoughnutCenterTextPlugin]}
            />
          </div>
          <div
            id="doughnutChart"
            className="Welcome-Completion-Graphs4"
            style={styles.completionGraphs4}
          >
            <Doughnut
              data={createDoughnutData(
                consumptionData.fat * 9,
                dailyCalorieNeed * 0.2,
              )}
              options={createDoughnutOptions("Fat")}
              plugins={[DoughnutCenterTextPlugin]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCompletionGraphs;
