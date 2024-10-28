package com.feedybackend.FeedyBackend.UserController;

import com.feedybackend.FeedyBackend.DTO.FoodLogDTO;
import com.feedybackend.FeedyBackend.Service.FoodLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/foodlog")
public class FoodLogController {

    @Autowired
    private FoodLogService foodLogService;

    @PostMapping("/save")
    public ResponseEntity<?> saveFoodLog(@RequestBody FoodLogDTO foodLogDTO) {
        foodLogService.saveFoodLog(foodLogDTO);
        return ResponseEntity.ok("Food log saved successfully");
    }

    @GetMapping("/{userId}/{date}")
    public ResponseEntity<List<FoodLogDTO>> getFoodLogsByUserIdAndDate(@PathVariable int userId, @PathVariable String date) {
        List<FoodLogDTO> foodLogs = foodLogService.getFoodLogsByUserIdAndDate(userId, date);
        return ResponseEntity.ok(foodLogs);
    }

    @PutMapping("/update/{id}")  // Use log ID for updating
    public ResponseEntity<?> updateFoodLog(@PathVariable int id, @RequestBody FoodLogDTO foodLogDTO) {
        foodLogService.updateFoodLog(id, foodLogDTO);  // Update the log with the given ID
        return ResponseEntity.ok("Food log updated successfully");
    }

    @GetMapping("/lastsevendays/{userId}")
    public ResponseEntity<List<FoodLogDTO>> getLastSevenDaysFoodLogs(@PathVariable int userId) {
        List<FoodLogDTO> foodLogs = foodLogService.getLastSevenDaysFoodLogs(userId);
        return ResponseEntity.ok(foodLogs);
    }

    @DeleteMapping("/{id}")  // Use log ID for deleting
    public ResponseEntity<?> deleteFoodLog(@PathVariable int id) {
        foodLogService.deleteFoodLog(id);  // Delete the log with the given ID
        return ResponseEntity.ok("Food log deleted successfully");
    }
}
