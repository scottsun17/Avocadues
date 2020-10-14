package com.avocadues.todolist.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class Category implements Serializable {
	private String category_id;
	private String category_name;
	private String color;	
}

