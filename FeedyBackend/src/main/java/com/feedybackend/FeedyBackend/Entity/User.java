package com.feedybackend.FeedyBackend.Entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {

  // User Data Points
  @Id
  @Column(name = "user_id", length = 45)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int userId;

  @Column(name = "user_name", length = 245)
  private String userName;

  @Column(name = "user_email", length = 245)
  private String userEmail;

  @Column(name = "password", length = 245)
  private String userPassword;

  @Column(name = "age", length = 245)
  private int age;

  @Column(name = "height", length = 255)
  private double height;

  @Column(name = "weight", length = 255)
  private double weight;

  @Column(name = "sex", length = 255)
  private String sex;

  @Column(name = "activity", length = 255)
  private String activity;

  // Constructors
  public User(
      int userId,
      String userName,
      String userEmail,
      String userPassword,
      int age,
      String sex,
      double height,
      double weight,
      String activity) {
    this.userId = userId;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.age = age;
    this.sex = sex;
    this.height = height;
    this.weight = weight;
    this.activity = activity ;
  }

  // Getter Setters
  public User() {}

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public double getHeight() {
    return height;
  }

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }

  public void setHeight(double height) {
    this.height = height;
  }

  public double getWeight() {
    return weight;
  }

  public void setWeight(double weight) {
    this.weight = weight;
  }

  public int getUserId() {
    return userId;
  }

  public String getActivity() {
    return activity;
  }

  public void setActivity(String activity) {
    this.activity = activity;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getUserEmail() {
    return userEmail;
  }

  public void setUserEmail(String userEmail) {
    this.userEmail = userEmail;
  }

  public String getUserPassword() {
    return userPassword;
  }

  public void setUserPassword(String userPassword) {
    this.userPassword = userPassword;
  }

  @Override
  public String toString() {
    return "User{"
        + "userId="
        + userId
        + ", userName='"
        + userName
        + '\''
        + ", userEmail='"
        + userEmail
        + '\''
        + ", userPassword='"
        + userPassword
        + '\''
        + '}';
  }
}
