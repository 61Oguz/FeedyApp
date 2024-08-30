import React from 'react';
import {Bar, Doughnut, Line} from "react-chartjs-2";
import useAuth from "../../../Hooks/useAuth.jsx";

const WelcomeWeeklyBarGraph = ({calorieData, dailyCalorieNeed}) => {


    const barChartData = {
        labels: calorieData.map((log) => log.date), datasets: [{
            label: "Calorie Intake",
            data: calorieData.map((log) => log.calories),
            backgroundColor: "rgba(0,12,12,0.65)",
            borderColor: "rgb(6,35,35)",
            borderWidth: 1,
        },],
    };

    const chartOptions = {
        plugins: {
            title: {
                display: true, text: "Calorie Intakes of the Last Seven Days",
            }, tooltip: {
                callbacks: {
                    label: function (context) {
                        const percentage = ((context.raw / dailyCalorieNeed) * 100).toFixed(2,);
                        return `${context.raw} calories (${percentage}%)`;
                    },
                },
            },
        }, scales: {
            y: {
                beginAtZero: true, max: dailyCalorieNeed, // Set the maximum y-axis value to the daily calorie need
            },
        },
    };


    return (<div>


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