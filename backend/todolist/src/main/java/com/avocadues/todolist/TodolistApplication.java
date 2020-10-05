package com.avocadues.todolist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class TodolistApplication {

	@GetMapping(value="/hello")
	public String getMethodName() {
		return "咸鱼是变态";
	}
	

	public static void main(String[] args) {
		SpringApplication.run(TodolistApplication.class, args);
	}

}
