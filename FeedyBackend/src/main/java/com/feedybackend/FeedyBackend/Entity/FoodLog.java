package com.feedybackend.FeedyBackend.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "food_log")
public class FoodLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "food_name")
    private String foodName;

    @Column(name = "date")
    private String date;

    @Column(name = "calories")
    private double calories;

    @Column(name = "food_id")
    private int foodId;

    @Column(name = "protein")
    private double protein;

    @Column(name = "fat")
    private double fat;

    @Column(name = "carbs")
    private double carbs;

    @Column(name = "portion_size")
    private double portionSize;

    @Column(name = "portion_type")
    private String portionType; // Add portion type

    public double getPortionSize() {
        return portionSize;
    }

    public void setPortionSize(double portionSize) {
        this.portionSize = portionSize;
    }

    public String getPortionType() {
        return portionType;
    }

    public void setPortionType(String portionType) {
        this.portionType = portionType;
    }

    // Constructors, getters, and setters
    public FoodLog() {}

    public FoodLog(int userId, String foodName, String date, double calories, int foodId, double protein, double fat, double carbs, double portionSize, String portionType) {
        this.userId = userId;
        this.foodName = foodName;
        this.date = date;
        this.calories = calories;
        this.foodId = foodId;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
        this.portionSize = portionSize;
        this.portionType = portionType; // Initialize portion type
    }

    public int getId() {
        return id;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }
}
