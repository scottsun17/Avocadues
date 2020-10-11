package com.avocadues.todolist.mapper;

import java.util.List;

import com.avocadues.todolist.TodolistApplicationTests;
import com.avocadues.todolist.entity.Air;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AirMapperTest extends TodolistApplicationTests {
    @Autowired
    private AirMapper airMapper;

    @Test
    void findAll(){
        List<Air> list = airMapper.findAll();
        for(Air air : list){
            System.out.println(air);
        }
    }

    @Test
    public void findByPage(){
        //divide page
        PageHelper.startPage(1, 5);

        //search
        List<Air> list = airMapper.findAll();

        //encapsolate pageinfo
        PageInfo<Air> pageinfo = new PageInfo<>(list);

        //return data
        for (Air air : pageinfo.getList()) {
            System.out.println(air);
        }

    }
}
