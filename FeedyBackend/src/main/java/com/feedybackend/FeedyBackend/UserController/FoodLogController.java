package com.feedybackend.FeedyBackend.UserController;

import com.feedybackend.FeedyBackend.DTO.FoodLogDTO;
import com.feedybackend.FeedyBackend.DTO.UserDTO;
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

    @GetMapping("/lastsevendays/{userId}")
    public ResponseEntity<List<FoodLogDTO>> getLastSevenDaysFoodLogs(@PathVariable int userId) {
        List<FoodLogDTO> foodLogs = foodLogService.getLastSevenDaysFoodLogs(userId);
        return ResponseEntity.ok(foodLogs);
    }

}
