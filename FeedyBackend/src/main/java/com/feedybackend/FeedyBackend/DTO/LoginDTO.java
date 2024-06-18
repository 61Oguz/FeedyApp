package com.feedybackend.FeedyBackend.DTO;

public class LoginDTO {
  private String userEmail;
  private String userPassword;

  public LoginDTO(String userEmail, String userPassword) {
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }

  public LoginDTO() {}

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
}
