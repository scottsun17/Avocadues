package com.avocadues.todolist.mapper;

import java.util.HashSet;
import java.util.Set;

import com.avocadues.todolist.TodolistApplicationTests;
import com.avocadues.todolist.utils.IdUtils;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestIdUtil extends TodolistApplicationTests{

    @Test
    void test(){
        Set<String> set = new HashSet<>();
        for(int i = 0; i < 100; i++){
            set.add(IdUtils.getIncreaseIdByNanoTime());
        }
        System.out.println(set.size());
    }
}
