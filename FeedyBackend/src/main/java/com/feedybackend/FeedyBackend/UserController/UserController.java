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

  //Saves the user to the database.
  @PostMapping("/save")
  public ResponseEntity<?> saveUser(@Valid @RequestBody UserDTO userDTO) {
    String id = userService.addUser(userDTO);
    return ResponseEntity.ok(id);
  }

  //Gets all the saved users from the database as a List.
  @GetMapping("/all")
  public List<UserDTO> getAllUsers() {
    return userService.getAllUsers();
  }

  //Sends the Login request.
  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
    LoginResponse loginResponse = userService.loginUser(loginDTO);
    return ResponseEntity.ok(loginResponse);
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserDTO userDTO) {
    UserDTO updatedUser = userService.updateUser(id, userDTO);
    return ResponseEntity.ok(updatedUser);
  }


  @GetMapping("/{id}")
  public ResponseEntity<?> getUserById(@PathVariable int id) {
    UserDTO userDTO = userService.getUserById(id);
    return ResponseEntity.ok(userDTO);
  }


}
