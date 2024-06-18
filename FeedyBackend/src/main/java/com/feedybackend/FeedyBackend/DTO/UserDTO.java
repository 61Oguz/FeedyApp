package com.feedybackend.FeedyBackend.DTO;

import jakarta.persistence.Column;

import javax.validation.constraints.NotNull;


public class UserDTO {

    private int userId;

    @NotNull(message = "Username cannot be null")
    private String userName;

    @NotNull(message = "Email cannot be null")
    private String userEmail;

    @NotNull(message = "Password cannot be null")
    private String userPassword;


    public UserDTO(int userId, String userName, String userEmail, String userPassword) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }

    public UserDTO() {
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

    @Override
    public String toString() {
        return "UserDTO{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userPassword='" + userPassword + '\'' +
                '}';
    }
}
