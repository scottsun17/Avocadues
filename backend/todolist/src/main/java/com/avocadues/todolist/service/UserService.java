package com.avocadues.todolist.service;

import java.util.List;

import com.avocadues.todolist.entity.User;

public interface UserService {
    public void addUser(User user);
    public List<User> selectAllUser();
}
