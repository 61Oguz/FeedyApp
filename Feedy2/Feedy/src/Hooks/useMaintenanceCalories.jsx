import { useState, useEffect } from "react";

const useMaintenanceCalories = (user) => {
  const [dailyCalorieNeed, setDailyCalorieNeed] = useState(0);

  useEffect(() => {
    if (user) {
      const maintenanceCalories = calculateMaintenanceCalories(user);
      setDailyCalorieNeed(maintenanceCalories);
    }
  }, [user]);

  const calculateMaintenanceCalories = (user) => {
    const BMR = 10 * user.weight + 6.25 * user.height - 5 * user.age;
    const maintenanceCalories = BMR * 1.55;
    return Math.round(maintenanceCalories);
  };

  return dailyCalorieNeed;
};

export default useMaintenanceCalories;
