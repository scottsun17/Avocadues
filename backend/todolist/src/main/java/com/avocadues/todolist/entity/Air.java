package com.avocadues.todolist.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class Air implements Serializable {
    private Integer id;
    private Integer district_Id;
    private java.util.Date monitorTime;
    private Integer pm10;
    private Integer pm25;
    private String monitoringStation;
    private java.util.Date lastModifyTime;

}
