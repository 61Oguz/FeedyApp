package com.feedybackend.FeedyBackend.DTO;

import javax.validation.constraints.NotNull;

public class UserDTO {
  private int userId;
  @NotNull(message = "Username cannot be null")
  private String userName;
  @NotNull(message = "Email cannot be null")
  private String userEmail;
  @NotNull(message = "Password cannot be null")
  private String userPassword;
  @NotNull(message = "Age cannot be null")
  private int age;
  @NotNull(message = "Sex cannot be null")
  private String sex ;
  @NotNull(message = "Height cannot be null")
  private double height;
  @NotNull(message = "Weight cannot be null")
  private double weight;



  // Constructors
  public UserDTO(
      int userId,
      String userName,
      String userEmail,
      String userPassword,
      int age,
      String sex,
      double height,
      double weight) {
    this.userId = userId;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.age = age;
    this.sex = sex;
    this.height = height;
    this.weight = weight;
  }

  public UserDTO() {}

  // Getter Setters
  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public double getHeight() {
    return height;
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

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }

  @Override
  public String toString() {
    return "UserDTO{"
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
