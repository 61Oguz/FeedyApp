package com.feedybackend.FeedyBackend.Repo;

import com.feedybackend.FeedyBackend.Entity.FoodLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodLogRepo extends JpaRepository<FoodLog, Integer> {
    List<FoodLog> findByUserIdAndDate(int userId, String date);

    List<FoodLog> findByUserIdAndDateBetween(int userId, String startDate, String endDate);

}
