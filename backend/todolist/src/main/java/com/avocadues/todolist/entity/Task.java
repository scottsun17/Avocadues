package com.avocadues.todolist.entity;

import lombok.Data;

@Data
public class Task {
    private String task_id;
    private String description;
    private boolean status;
    private String category_id;

    public void setTaskId(String task_id){
        this.task_id = task_id;
    }
    
    public void setDescription(String description){
        this.description = description;
    }

    public void setStatus(boolean status){
        this.status = status;
    }

    public void setCategoryId(String category_id){
		this.category_id = category_id;
    }

    public String getDescription(){
        return this.description;
    }

    public boolean getStatus(){
        return this.status;
    }

    public String getTaskId(){
        return this.task_id;
    }
    
    public String getCategoryId(){
		return this.category_id;
	}


    

}
