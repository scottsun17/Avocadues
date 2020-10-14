package com.avocadues.todolist.mapper;

import java.util.List;

import com.avocadues.todolist.TodolistApplicationTests;
import com.avocadues.todolist.entity.District;
// import com.avocadues.todolist.entity.User;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class DistrictMapperTest extends TodolistApplicationTests{
    
    @Autowired
    private DistrictMapper mapper;

    @Test
    void findAll(){
        List<District> list = mapper.findAll();
        for(District district : list){
            System.out.println(district);
        }
    }

    @Test
    void findOneById(){
        District district = mapper.findOneById(1);
        System.out.println(district);
    }

    @Autowired
    private UserMapper userMapper;


}
