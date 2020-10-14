package com.avocadues.todolist.entity;

import java.io.Serializable;

import lombok.Data;


@Data
public class User_Category implements Serializable {

	private String uid;
	private String categoryId;

	public String getCategoryId(){
		return this.categoryId;
	}

	public String getUid(){
		return this.uid;
	}

	public void setUid(String uid){
		this.uid = uid;
	}

	public void setCategoryId(String categoryId){
		this.categoryId = categoryId;
	}
}

