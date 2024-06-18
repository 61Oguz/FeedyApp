package com.feedybackend.FeedyBackend.Repo;


import com.feedybackend.FeedyBackend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {


    Optional<User> findOneByUserEmailAndUserPassword(String userEmail, String userPassword);
    User findByUserEmail(String userEmail);

}
