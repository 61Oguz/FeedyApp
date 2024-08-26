package com.feedybackend.FeedyBackend.Service;

import com.feedybackend.FeedyBackend.DTO.FoodLogDTO;

import java.util.List;

public interface FoodLogService {
    void saveFoodLog(FoodLogDTO foodLogDTO);
    List<FoodLogDTO> getFoodLogsByUserIdAndDate(int userId, String date);
    List<FoodLogDTO> getLastSevenDaysFoodLogs(int userId);


}
