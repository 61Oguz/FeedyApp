package com.feedybackend.FeedyBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)

public class FeedyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FeedyBackendApplication.class, args);
	}

}
