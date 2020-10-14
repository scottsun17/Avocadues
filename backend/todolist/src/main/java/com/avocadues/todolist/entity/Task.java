package com.avocadues.todolist.entity;

import lombok.Data;

@Data
public class Task {
    private String taskId;
    private String description;
    private boolean status;
}
