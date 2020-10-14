package com.avocadues.todolist.controller;

import java.util.List;

import com.avocadues.todolist.entity.Air;
import com.avocadues.todolist.entity.Category;
import com.avocadues.todolist.entity.Category_Task;
import com.avocadues.todolist.entity.Task;
import com.avocadues.todolist.entity.User;
import com.avocadues.todolist.mapper.AirMapper;
import com.avocadues.todolist.mapper.CategoryMapper;
import com.avocadues.todolist.mapper.CategoryTaskMapper;
import com.avocadues.todolist.mapper.TaskMapper;
import com.avocadues.todolist.mapper.UserMapper;
import com.avocadues.todolist.properties.AwSProperties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;




@RestController
public class TestController {
    
    
    // //can use Autowired to do it, but Resource name has higher priority than autowired 
    // @Resource(name = "user1")
    // private User user;


    // @GetMapping("/test")
    // public String test(){
    //     return "Hello Spring";
    // }

    // @GetMapping("/user")
    // public User user(){
    //     return user;
    // }

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

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private CategoryTaskMapper categoryTaskMapper;
    @Autowired
    private TaskMapper taskMapper;

    @GetMapping("/user")
    public List<User> getUserList(){
        List<User> list = userMapper.getAllUserAndCategory();
        return list;
    }

    @GetMapping("/category")
    public List<Category> getAllCategories(){
        List<Category> list = categoryMapper.getAllCategories();
        return list;
    }

    @GetMapping("/categorytask")
    public List<Category_Task> getAllCategoryTasks(){
        List<Category_Task> list = categoryTaskMapper.getAllCategoryTask();
        return list;
    }

    @GetMapping("/task")
    public List<Task> getAllTasks(){
        List<Task> list = taskMapper.getAllTasks();
        return list;
    }
}
