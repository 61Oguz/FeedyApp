import {useState, useEffect} from "react";
import axios from "axios";

const useConsumptionData = (userId) => {
    const [todayConsumption, setTodayConsumption] = useState({calories: 0, protein: 0, carbs: 0, fat: 0});
    const [yesterdayConsumption, setYesterdayConsumption] = useState({calories: 0, protein: 0, carbs: 0, fat: 0});
    const [datesConsumption, setDatesConsumption] = useState({calories: 0, protein: 0, carbs: 0, fat: 0});
    const [date, setDate] = useState();

    useEffect(() => {
        if (userId) {
            fetchTodayConsumption();
            fetchYesterdayConsumption();

        }
    }, [userId]);


    const fetchTodayConsumption = async () => {
        try {
            const todayDate = new Date().toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:8080/api/foodlog/${userId}/${todayDate}`);
            const {calories, protein, carbs, fat} = response.data.reduce((totals, log) => {
                totals.calories += log.calories;
                totals.protein += log.protein;
                totals.carbs += log.carbs;
                totals.fat += log.fat;
                return totals;
            }, {calories: 0, protein: 0, carbs: 0, fat: 0});
            setTodayConsumption({calories, protein, carbs, fat});
        } catch (error) {
            console.error("Error fetching today's consumption:", error);
        }
    };


    const fetchYesterdayConsumption = async () => {
        try {
            const yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            const formattedYesterdayDate = yesterdayDate.toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:8080/api/foodlog/${userId}/${formattedYesterdayDate}`);
            const {calories, protein, carbs, fat} = response.data.reduce((totals, log) => {
                totals.calories += log.calories;
                totals.protein += log.protein;
                totals.carbs += log.carbs;
                totals.fat += log.fat;
                return totals;
            }, {calories: 0, protein: 0, carbs: 0, fat: 0});
            setYesterdayConsumption({calories, protein, carbs, fat});
        } catch (error) {
            console.error("Error fetching yesterday's consumption:", error);
        }
    };

    return {todayConsumption, yesterdayConsumption};
};

export default useConsumptionData;
