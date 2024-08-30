package com.feedybackend.FeedyBackend.Service;

import com.feedybackend.FeedyBackend.DTO.LoginDTO;
import com.feedybackend.FeedyBackend.DTO.UserDTO;
import com.feedybackend.FeedyBackend.payload.response.LoginResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    String addUser(UserDTO userDTO);

    List<UserDTO> getAllUsers();

    LoginResponse loginUser(LoginDTO loginDTO);

    UserDTO getUserById(int id);
}
