package com.feedybackend.FeedyBackend.Service.impl;

import com.feedybackend.FeedyBackend.DTO.LoginDTO;
import com.feedybackend.FeedyBackend.DTO.UserDTO;
import com.feedybackend.FeedyBackend.Entity.User;
import com.feedybackend.FeedyBackend.Repo.UserRepo;
import com.feedybackend.FeedyBackend.Service.UserService;
import com.feedybackend.FeedyBackend.payload.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

import java.util.List;


@Service
public class UserIMPL implements UserService {

  @Autowired private UserRepo userRepo;

  @Autowired private PasswordEncoder passwordEncoder;

  @Override
  public String addUser(UserDTO userDTO) {
    if (userDTO.getUserPassword() == null) {
      throw new IllegalArgumentException("Password cannot be null");
    }

    User user =
        new User(
            userDTO.getUserId(),
            userDTO.getUserName(),
            userDTO.getUserEmail(),
            this.passwordEncoder.encode(userDTO.getUserPassword()));

    userRepo.save(user);
    return user.getUserName();
  }

  public List<UserDTO> getAllUsers(){
      List<User> users = userRepo.findAll();
      return users.stream()
              .map(user -> new UserDTO(user.getUserId(),user.getUserName(),user.getUserEmail(),user.getUserPassword()))
              .collect(Collectors.toList());

  }

  public LoginResponse loginUser(LoginDTO loginDTO) {
    String msg = "";
    User user1 = userRepo.findByUserEmail(loginDTO.getUserEmail());
    if (user1 != null) {
      String password = loginDTO.getUserPassword();
      String encodedPassword = user1.getUserPassword();
      Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
      if (isPwdRight) {
        Optional<User> employee = userRepo.findOneByUserEmailAndUserPassword(loginDTO.getUserEmail(), encodedPassword);
        if (employee.isPresent()) {
          return new LoginResponse("Login Success", true);
        } else {
          return new LoginResponse("Login Failed", false);
        }
      } else {
        return new LoginResponse("password Not Match", false);
      }
    }else {
      return new LoginResponse("Email does not exits int the System. Try to register.", false);
    }
  }
}
