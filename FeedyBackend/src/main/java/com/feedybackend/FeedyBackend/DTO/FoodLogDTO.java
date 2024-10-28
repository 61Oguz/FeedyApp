package com.feedybackend.FeedyBackend.DTO;

public class FoodLogDTO {
    private int id ;



    private int userId;
    private String foodName;
    private String date;
    private double calories;
    private int foodId;
    private double protein;
    private double fat;
    private double carbs;
    private double portionSize;
    private String portionType; // Add portion type

    // Constructors, getters, and setters
    public FoodLogDTO() {}

    public FoodLogDTO(int id , int userId, String foodName, String date, double calories, int foodId, double protein, double fat, double carbs, double portionSize, String portionType) {
      this.id = id;
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

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

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
}
