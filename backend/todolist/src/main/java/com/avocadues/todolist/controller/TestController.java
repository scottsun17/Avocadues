package com.avocadues.todolist.controller;

import java.sql.PreparedStatement;
import java.util.List;

import javax.annotation.Resource;

import com.avocadues.todolist.entity.Air;
import com.avocadues.todolist.entity.User;
import com.avocadues.todolist.mapper.AirMapper;
import com.avocadues.todolist.properties.AwSProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;




@RestController
public class TestController {
    
    
    //can use Autowired to do it, but Resource name has higher priority than autowired 
    @Resource(name = "user1")
    private User user;


    @GetMapping("/test")
    public String test(){
        return "Hello Spring";
    }

    @GetMapping("/user")
    public User user(){
        return user;
    }

    @Value("${picPath}")
    private String picPath;
    
    @GetMapping("/picPath")
    public String picPath(){
        return picPath;
    }

    @Autowired
    private AwSProperties properties;
    

    @GetMapping("/aws")
    public AwSProperties aws(){
        return properties;
    }

    @Autowired
    private AirMapper airMapper;

    @GetMapping("/air")
    public List<Air> air() {
        List<Air> list = airMapper.findAll();
        return list;
    }
}
