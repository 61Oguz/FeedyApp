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
            this.passwordEncoder.encode(userDTO.getUserPassword()),
            userDTO.getAge(),
            userDTO.getSex(),
            userDTO.getHeight(),
            userDTO.getWeight());

    userRepo.save(user);
    return String.valueOf(user.getUserId());
  }

  public List<UserDTO> getAllUsers() {
    List<User> users = userRepo.findAll();
    return users.stream()
        .map(
            user ->
                new UserDTO(
                    user.getUserId(),
                    user.getUserName(),
                    user.getUserEmail(),
                    user.getUserPassword(),
                    user.getAge(),
                    user.getSex(),
                    user.getHeight(),
                    user.getWeight()))
        .collect(Collectors.toList());
  }

  public LoginResponse loginUser(LoginDTO loginDTO) {

    User user1 = userRepo.findByUserEmail(loginDTO.getUserEmail());
    if (user1 != null) {
      String password = loginDTO.getUserPassword();
      String encodedPassword = user1.getUserPassword();
      Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
      if (isPwdRight) {
        Optional<User> user =
            userRepo.findOneByUserEmailAndUserPassword(loginDTO.getUserEmail(), encodedPassword);
        if (user.isPresent()) {
          return new LoginResponse("Login Success", true, user1.getUserId());
        } else {
          return new LoginResponse("Login Failed", false, 0);
        }
      } else {
        return new LoginResponse("Password Not Match", false, 0);
      }
    } else {
      return new LoginResponse("Email does not exist in the System. Try to register.", false, 0);
    }
  }

  @Override
  public UserDTO getUserById(int id) {
    Optional<User> user = userRepo.findById(id);
    if (user.isPresent()) {
      User u = user.get();
      return new UserDTO(
          u.getUserId(),
          u.getUserName(),
          u.getUserEmail(),
          u.getUserPassword(),
          u.getAge(),
          u.getSex(),
          u.getHeight(),
          u.getWeight());
    } else {
      throw new RuntimeException("User not found");
    }
  }
}
