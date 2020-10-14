package com.avocadues.todolist.controller;

import java.util.List;

import com.avocadues.todolist.entity.User;
import com.avocadues.todolist.mapper.UserMapper;
// import com.avocadues.todolist.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private UserMapper userMapper;

    // http://localhost:8080/addUser?uid=j2ueh
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public void addUser(User user) {

        userMapper.addUser(user);
    }

    @RequestMapping(value = "/getAllUsers", produces = { "application/json;charset=UTF-8" })
    public List<User> getAllUsers() {
        return userMapper.selectAllUser();
    }
}
