import React, {useState, useEffect} from "react";
import axios from "axios";
import "../styles/WelcomePage.css";
import "../styles/SideBar.css";
import DefaultSideBar from "../Components/GeneralComponents/DefaultSideBar.jsx";
import Header from "../Components/GeneralComponents/Header.jsx";
import useAuth from "../../Hooks/useAuth.jsx";
import useSidebar from "../../Hooks/useSidebar.jsx";
import WelcomeCompletionGraphs from "../Components/WelcomePage/WelcomeCompletionGraphs.jsx";
import WelcomeWeeklyLineGraph from "../Components/WelcomePage/WelcomeWeeklyLineGraph.jsx";
import WelcomeWeeklyBarGraph from "../Components/WelcomePage/WelcomeWeeklyBarGraph.jsx";
import useMaintenanceCalories from "../../Hooks/useMaintenanceCalories.jsx";
import useConsumptionData from "../../Hooks/useConsumptionData.jsx";
import UserFeedback from "../Components/WelcomePage/UserFeedback.jsx";



const WelcomePage = () => {
    const {user, handleLogout} = useAuth();
    const dailyCalorieNeed = useMaintenanceCalories(user);
    const {isSidebarOpen, handleSidebarToggle} = useSidebar()
    const [calorieData, setCalorieData] = useState([]);
    const [completionRate, setCompletionRate] = useState(0);
    const { todayConsumption, yesterdayConsumption } = useConsumptionData(user?.userId);


    useEffect(() => {
        if (user) {
            fetchCalorieData();

        }
    }, [user]);

    const fetchCalorieData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/foodlog/lastsevendays/${user.userId}`
            );
            const groupedData = groupByDate(response.data);
            setCalorieData(groupedData);
            calculateCompletionRate(groupedData);
        } catch (error) {
            console.error("Error fetching calorie data:", error);
        }
    };

    const groupByDate = (data) => {
        const grouped = data.reduce((acc, log) => {
            const date = log.date;
            if (!acc[date]) {
                acc[date] = {date: date, calories: 0};
            }
            acc[date].calories += log.calories;
            return acc;
        }, {});

        return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const calculateCompletionRate = (data) => {
        const totalCalories = data.reduce((total, log) => total + log.calories, 0);
        const targetCalories = dailyCalorieNeed;
        const rate = (totalCalories / targetCalories) * 100;
        setCompletionRate(rate.toFixed(2));
    };


    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="welcome-container">
            <Header logout={handleLogout} user={user} isSidebarOpen={isSidebarOpen}/>
            <DefaultSideBar user={user} logout={handleLogout} onToggle={handleSidebarToggle}/>
            <div className={`main-content ${isSidebarOpen ? "" : "sidebar-closed"}`}>

                <div className="content-box">
                    <UserFeedback
                        todayConsumption={todayConsumption}
                        yesterdayConsumption={yesterdayConsumption}
                        dailyCalorieNeed={dailyCalorieNeed}
                    />
                </div>
                <WelcomeCompletionGraphs dailyCalorieNeed={dailyCalorieNeed} consumptionData={yesterdayConsumption}/>
            </div>
            <div className="chart-container">
                <WelcomeWeeklyLineGraph calorieData={calorieData} dailyCalorieNeed={dailyCalorieNeed}/>
                <WelcomeWeeklyBarGraph calorieData={calorieData} dailyCalorieNeed={dailyCalorieNeed}/>
            </div>
            <div className="completion-rate">
                <h3>Welcome, {user.userName}!</h3>
                <h4>Calorie Completion Rate: {completionRate}%</h4>
            </div>
        </div>
    );
};

export default WelcomePage;
