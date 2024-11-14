package com.feedybackend.FeedyBackend.Service.impl;

import com.feedybackend.FeedyBackend.DTO.FoodLogDTO;
import com.feedybackend.FeedyBackend.Entity.FoodLog;
import com.feedybackend.FeedyBackend.Repo.FoodLogRepo;
import com.feedybackend.FeedyBackend.Service.FoodLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodLogServiceImpl implements FoodLogService {

    @Autowired
    private FoodLogRepo foodLogRepo;

    @Override
    public void saveFoodLog(FoodLogDTO foodLogDTO) {
        FoodLog foodLog = new FoodLog();
    foodLog.setId(foodLog.getId());
        foodLog.setUserId(foodLogDTO.getUserId());
        foodLog.setFoodName(foodLogDTO.getFoodName());
        foodLog.setDate(foodLogDTO.getDate());
        foodLog.setCalories(foodLogDTO.getCalories());
        foodLog.setFoodId(foodLogDTO.getFoodId());
        foodLog.setProtein(foodLogDTO.getProtein());
        foodLog.setFat(foodLogDTO.getFat());
        foodLog.setCarbs(foodLogDTO.getCarbs());
        foodLog.setPortionSize(foodLogDTO.getPortionSize());
        foodLog.setPortionType(foodLogDTO.getPortionType());

        foodLogRepo.save(foodLog);
    }

    @Override
    public List<FoodLogDTO> getFoodLogsByUserIdAndDate(int userId, String date) {
        List<FoodLog> foodLogs = foodLogRepo.findByUserIdAndDate(userId, date);
        return foodLogs.stream()
                .map(foodLog -> new FoodLogDTO(
                        foodLog.getId(),
                        foodLog.getUserId(),
                        foodLog.getFoodName(),
                        foodLog.getDate(),
                        foodLog.getCalories(),
                        foodLog.getFoodId(),
                        foodLog.getProtein(),
                        foodLog.getFat(),
                        foodLog.getCarbs(),
                        foodLog.getPortionSize(),
                        foodLog.getPortionType()))
                .collect(Collectors.toList());
    }




    @Override
    public List<FoodLogDTO> getLastSevenDaysFoodLogs(int userId) {
        LocalDate today = LocalDate.now();
        LocalDate sevenDaysAgo = today.minusDays(7);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        List<FoodLog> foodLogs = foodLogRepo.findByUserIdAndDateBetween(userId, formatter.format(sevenDaysAgo), formatter.format(today));
        return foodLogs.stream()
                .map(foodLog -> new FoodLogDTO(
                        foodLog.getId(),
                        foodLog.getUserId(),
                        foodLog.getFoodName(),
                        foodLog.getDate(),
                        foodLog.getCalories(),
                        foodLog.getFoodId(),
                        foodLog.getProtein(),
                        foodLog.getFat(),
                        foodLog.getCarbs(),
                        foodLog.getPortionSize(),
                        foodLog.getPortionType()))
                .collect(Collectors.toList());
    }

    @Override
    public void updateFoodLog(int id, FoodLogDTO foodLogDTO) {
        FoodLog foodLog = foodLogRepo.findById(id).orElseThrow(() -> new RuntimeException("Log not found"));
        // Update the food log fields...
        foodLogRepo.save(foodLog);
    }

    @Override
    public void deleteFoodLog(int id) {
        if (!foodLogRepo.existsById(id)) {
            throw new RuntimeException("Log with ID " + id + " does not exist");
        }
        foodLogRepo.deleteById(id);
    }
}

