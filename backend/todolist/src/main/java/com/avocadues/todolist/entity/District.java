package com.avocadues.todolist.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class District implements Serializable {
    private Integer id;
    private String name;
}
