package com.avocadues.todolist.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class Category implements Serializable {
	private String category_id;
	private String category_name;
	private String color;	
	private String uid;

	public String getCategoryId(){
		return this.category_id;
	}

	public String getCategoryName(){
		return this.category_name;
	}

	public String getColor(){
		return this.color;
	}

	public String getUid(){
		return this.uid;
	}

	public void setCategoryId(String category_id){
		this.category_id = category_id;
	}

	public void setCategoryName(String category_name){
		this.category_name = category_name;
	}

	public void setColor(String color){
		this.color = color;
	}

	public void setUid(String uid){
		this.uid = uid;
	}
}

