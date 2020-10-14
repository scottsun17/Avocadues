package com.avocadues.todolist.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class Category_Task implements Serializable {
    private String categoryId;
	private String categoryName;
	private String color;	
}
