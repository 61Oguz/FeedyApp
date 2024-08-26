import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import {Pie, Doughnut} from "react-chartjs-2";
import "chart.js/auto";
import html2canvas from "html2canvas";
import "../styles/FoodLog.css";
import DefaultSideBar from "../Components/GeneralComponents/DefaultSideBar.jsx";
import Header from "../Components/GeneralComponents/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import PrintableFoodLog from "./PrintableFoodLog";
import {jsPDF} from "jspdf";
import "jspdf-autotable";
import useMaintenanceCalories from "../../Hooks/useMaintenanceCalories.jsx";
import useSidebar from "../../Hooks/useSidebar.jsx";
import WelcomeCompletionGraphs from "../Components/WelcomePage/WelcomeCompletionGraphs.jsx";
import DoughnutCenterTextPlugin from "../../plugins/DoughnutCenterTextPlugin.js";

const FoodLogPage = () => {
    const {user, handleLogout} = useAuth();
    const dailyCalorieNeed = useMaintenanceCalories(user);
    const [foodQuery, setFoodQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [foodLogs, setFoodLogs] = useState([]);
    const [portionSize, setPortionSize] = useState(1);
    const componentRef = useRef();
    const {isSidebarOpen, handleSidebarToggle} = useSidebar();
    const [datesConsumption, setDatesConsumption] = useState({calories: 0, protein: 0, carbs: 0, fat: 0});

    useEffect(() => {
        if (user && date) {
            fetchFoodLogs();
            fetchDatesConsumption();
        }
    }, [user, date]);

    const fetchFoodLogs = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/foodlog/${user.userId}/${date}`);
            setFoodLogs(response.data);
        } catch (error) {
            console.error("Error fetching food logs:", error);
        }
    };

    const fetchDatesConsumption = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/foodlog/${user.userId}/${date}`);
            const {calories, protein, carbs, fat} = response.data.reduce((totals, log) => {
                totals.calories += log.calories;
                totals.protein += log.protein;
                totals.carbs += log.carbs;
                totals.fat += log.fat;
                return totals;
            }, {calories: 0, protein: 0, carbs: 0, fat: 0});
            setDatesConsumption({calories, protein, carbs, fat});
        } catch (error) {
            console.error("Error fetching selected date's consumption:", error);
        }
    };

    const handleSuggestionsFetchRequested = async ({value}) => {
        try {
            const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=uDkRCNEx1og7hBgeppz9TWfdcteGAG6PWynpd3iA&query=${value}`);
            const uniqueFoods = [];
            const foodMap = new Map();

            response.data.foods.forEach(food => {
                if (!foodMap.has(food.description)) {
                    foodMap.set(food.description, true);
                    uniqueFoods.push(food);
                }
            });

            setSuggestions(uniqueFoods);
        } catch (error) {
            console.error("Error fetching food suggestions:", error);
        }
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleSuggestionSelected = (event, {suggestion}) => {
        setSelectedFood(suggestion);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFood || !date) {
            alert("Please select a food item and date.");
            return;
        }
        try {
            const protein = (selectedFood.foodNutrients.find((n) => n.nutrientName === "Protein")?.value || 0) * portionSize;
            const fat = (selectedFood.foodNutrients.find((n) => n.nutrientName === "Total lipid (fat)")?.value || 0) * portionSize;
            const carbs = (selectedFood.foodNutrients.find((n) => n.nutrientName === "Carbohydrate, by difference")?.value || 0) * portionSize;
            const calories = (selectedFood.foodNutrients.find((n) => n.nutrientName === "Energy")?.value || 0) * portionSize;
            await axios.post("http://localhost:8080/api/foodlog/save", {
                userId: user.userId,
                foodName: selectedFood.description,
                date: date,
                calories: calories,
                foodId: selectedFood.fdcId,
                protein: protein,
                fat: fat,
                carbs: carbs,
                portionSize: portionSize,
            });
            alert("Food log saved successfully!");
            fetchFoodLogs();
            fetchDatesConsumption(); // Update the consumption after adding a new log
        } catch (error) {
            console.error("Error saving food log:", error);
        }
    };

    const renderSuggestion = (suggestion) => (<div className="suggestion-item">{suggestion.description}</div>);

    const inputProps = {
        placeholder: "Search for food...",
        value: foodQuery,
        onChange: (event, {newValue}) => setFoodQuery(newValue),
        className: "searchInput",
    };

    const totalCalories = foodLogs.reduce((total, log) => total + log.calories, 0);
    const totalProtein = foodLogs.reduce((total, log) => total + log.protein, 0);
    const totalFat = foodLogs.reduce((total, log) => total + log.fat, 0);
    const totalCarbs = foodLogs.reduce((total, log) => total + log.carbs, 0);

    const pieData = {
        labels: ["Protein", "Carbs", "Fat"],
        datasets: [
            {
                label: "Nutrient Intake",
                data: [totalProtein || 0, totalCarbs || 0, totalFat || 0],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const pieOptions = {
        plugins: {
            legend: {
                labels: {
                    color: "rgba(1, 40, 33, 1)",
                    font: {
                        size: 12,
                    },
                },
            },
            title: {
                display: true,
                text: "Nutrient Intake Breakdown",
                color: "rgb(0,0,0)",
                font: {
                    size: 18,
                },
            },
        },
    };

    const doughnutData = {
        labels: ["Consumed", "Remaining"],
        datasets: [
            {
                data: [totalCalories, dailyCalorieNeed - totalCalories],
                backgroundColor: ["#FF6384", "#E0E0E0"],
                hoverBackgroundColor: ["#FF6384", "#E0E0E0"],
            },
        ],
    };

    const doughnutOptions = (centerText) => ({
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

    const handleDownload = async () => {
        try {
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.text("Food Logs", 10, 10);

            // Add the food logs table
            const tableColumn = ["Food Name", "Calories", "Protein (g)", "Fat (g)", "Carbs (g)", "Portion Size"];
            const tableRows = [];

            foodLogs.forEach((log) => {
                const foodData = [log.foodName, log.calories, log.protein, log.fat, log.carbs, log.portionSize];
                tableRows.push(foodData);
            });

            pdf.autoTable(tableColumn, tableRows, {startY: 20});

            // Add pie chart as an image
            const chartElement = document.getElementById("pieChart"); // Ensure the Pie chart has an id
            const canvas = await html2canvas(chartElement, {scale: 2});
            const imgData = canvas.toDataURL("image/png");

            // Add the image to the PDF
            const imgWidth = 120; // Width of the image in the PDF
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const position = pdf.autoTable.previous.finalY + 10; // Position below the table

            pdf.addImage(imgData, "PNG", 45, position, imgWidth, imgHeight);

            pdf.save("food_log.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className={`TodoWrapper ${isSidebarOpen ? "" : "sidebar-closed"}`}>
                <DefaultSideBar user={user} logout={handleLogout} onToggle={handleSidebarToggle}/>
                <Header logout={handleLogout} user={user} isSidebarOpen={isSidebarOpen}/>
                <form onSubmit={handleSubmit}>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                        onSuggestionsClearRequested={handleSuggestionsClearRequested}
                        getSuggestionValue={(suggestion) => suggestion.description}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={handleSuggestionSelected}
                        theme={{
                            suggestionsContainer: 'suggestions-container',
                            suggestion: 'suggestion-item',
                            suggestionHighlighted: 'suggestion-item--highlighted'
                        }}
                    />
                    <input
                        type="number"
                        placeholder="Portion"
                        value={portionSize}
                        onChange={(e) => setPortionSize(e.target.value)}
                        required
                        style={{marginBottom: 20, height: 30}}
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={{width: 150, height: 30, marginLeft: 63.7, marginTop: 15}}
                    />
                    <button className={"todo-btn"} type="submit">
                        Add
                    </button>
                </form>
                <div>
                    <h3 className={"nutrition-labels"}>Food Logs for {date}</h3>
                    <ul>
                        {foodLogs.map((log) => (
                            <li key={log.foodId}>
                                {log.foodName} - {log.calories} calories - {log.protein}g
                                protein - {log.fat}g fat - {log.carbs}g carbs -{" "}
                                {log.portionSize}x portion
                            </li>
                        ))}
                    </ul>
                    <h4 className={"nutrition-labels"}>
                        Total Calories: {totalCalories}
                    </h4>
                    <h4 className={"nutrition-labels"}>Total Protein: {totalProtein}g</h4>
                    <h4 className={"nutrition-labels"}>Total Fat: {totalFat}g</h4>
                    <h4 className={"nutrition-labels"}>Total Carbs: {totalCarbs}g</h4>
                </div>
                <div id={"pieChart"} className={"PieChartWrapper"}>
                    <Pie data={pieData} options={pieOptions}/>
                </div>
                <div id={"doughnutChart"} className={"DoughnutChartWrapper"}>
                    <Doughnut data={doughnutData} options={doughnutOptions("Calories")}
                              plugins={[DoughnutCenterTextPlugin]}/>
                </div>
            </div>
            <div>
                <WelcomeCompletionGraphs
                    dailyCalorieNeed={dailyCalorieNeed}
                    consumptionData={datesConsumption}
                    plugins={[DoughnutCenterTextPlugin]}
                    styles={{
                        mainContent: {marginLeft: '300px'},
                        calChartWrapper: {marginTop: '710px', marginLeft: '185px'},
                        completionGraphs: {display: 'flex', justifyContent: 'space-between', width: '100%'},
                        donutHeader: {visibility: 'hidden'},
                        completionGraphs1: {width: '185px', visibility: 'hidden'},
                        completionGraphs2: {width: '175px'},
                        completionGraphs3: {width: '175px'},
                        completionGraphs4: {width: '175px'}
                    }}
                />
            </div>
            <button className={"download-button"} onClick={handleDownload}>
                Download as PDF
            </button>
            <div style={{display: "none"}}>
                <PrintableFoodLog
                    ref={componentRef}
                    foodLogs={foodLogs}
                    date={date}
                    totalCalories={totalCalories}
                    totalProtein={totalProtein}
                    totalFat={totalFat}
                    totalCarbs={totalCarbs}
                    data={pieData}
                    options={pieOptions}
                />
            </div>
        </div>
    );
};

export default FoodLogPage;
