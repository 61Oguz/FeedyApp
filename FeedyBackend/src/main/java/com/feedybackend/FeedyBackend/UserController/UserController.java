package com.feedybackend.FeedyBackend.UserController;

import com.feedybackend.FeedyBackend.DTO.LoginDTO;
import com.feedybackend.FeedyBackend.DTO.UserDTO;
import com.feedybackend.FeedyBackend.Service.UserService;
import com.feedybackend.FeedyBackend.payload.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/user")
public class UserController {

  @Autowired private UserService userService;

  @PostMapping("/save")
  public String saveUser(@Valid @RequestBody UserDTO userDTO) {
    String id = userService.addUser(userDTO);
    return id;
  }

  @GetMapping("/all")
  public List<UserDTO> getAllUsers() {
    return userService.getAllUsers();
  }

  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
    LoginResponse loginResponse = userService.loginUser(loginDTO);
    return ResponseEntity.ok(loginResponse);
  }
}
