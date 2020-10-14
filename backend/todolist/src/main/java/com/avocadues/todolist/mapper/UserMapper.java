package com.avocadues.todolist.mapper;

import java.util.List;

import com.avocadues.todolist.entity.User;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;


public interface UserMapper {

    
    @Insert("insert into user(uid) values(#{uid})")
    public void addUser(User user);

    
    @Select("select * from user")
    public List<User> selectAllUser();    
}
