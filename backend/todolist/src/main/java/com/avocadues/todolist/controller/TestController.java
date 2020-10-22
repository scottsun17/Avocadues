package com.avocadues.todolist.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.avocadues.todolist.entity.Category;
import com.avocadues.todolist.entity.Task;
import com.avocadues.todolist.entity.User;
import com.avocadues.todolist.mapper.CategoryMapper;
import com.avocadues.todolist.mapper.TaskMapper;
import com.avocadues.todolist.mapper.UserMapper;
// import com.avocadues.todolist.service.UserService;
import com.avocadues.todolist.utils.IdUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "https://avocadues.com", maxAge = 3600)
@RestController
public class TestController {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private CategoryMapper categoryMapper;
    @Autowired
    private TaskMapper taskMapper;

    /**
     * Add a new user
     * @param user
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/addUser?uid=j2ueh
     */
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public void addUser(User user) {
        userMapper.addUser(user);
        Category category1 = new Category();
        category1.setCategoryId(IdUtils.getIncreaseIdByNanoTime());
        category1.setCategoryName("Work");
        category1.setColor("#e66767");
        category1.setUid(user.getUid());

        Category category2 = new Category();
        category2.setCategoryId(IdUtils.getIncreaseIdByNanoTime());
        category2.setCategoryName("School");
        category2.setColor("#1abc9c");
        category2.setUid(user.getUid());

        categoryMapper.addCategory(category1);
        categoryMapper.addCategory(category2);

        Task task1 = new Task();
        task1.setTaskId(IdUtils.getIncreaseIdByNanoTime());
        task1.setStatus(false);
        task1.setCategoryId(category1.getCategoryId());
        task1.setDescription("Let me start doing some work!");

        Task task2 = new Task();
        task2.setTaskId(IdUtils.getIncreaseIdByNanoTime());
        task2.setStatus(true);
        task2.setCategoryId(category1.getCategoryId());
        task2.setDescription("I have finished all the works!");

        Task task3 = new Task();
        task3.setTaskId(IdUtils.getIncreaseIdByNanoTime());
        task3.setStatus(false);
        task3.setCategoryId(category2.getCategoryId());
        task3.setDescription("Let me start studying!");

        Task task4 = new Task();
        task4.setTaskId(IdUtils.getIncreaseIdByNanoTime());
        task4.setStatus(true);
        task4.setCategoryId(category2.getCategoryId());
        task4.setDescription("I finished all my studying!");

        taskMapper.addNewTask(task1);
        taskMapper.addNewTask(task2);
        taskMapper.addNewTask(task3);
        taskMapper.addNewTask(task4);

    }

    /**
     * Get a list of all users
     * @return List<User> a list of all users
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getAllUsers
     */
    @RequestMapping(value = "/getAllUsers", produces = { "application/json;charset=UTF-8" })
    public List<User> getAllUsers() {
        return userMapper.selectAllUser();
    }


    /**
     * Get a list of all categories
     * @return List<Category> a list of all categories
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getAllCategories
     */
    @RequestMapping(value = "/getAllCategories", produces = { "application/json;charset=UTF-8" })
    public List<Category> getAllCategories() {
        return categoryMapper.getAllCategories();
    }


    /**
     * Get a list of category base on user.uid
     * @param user
     * @return List<Category> a list of category
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getCategoryByUid?uid=3
     */
    @RequestMapping(value = "/getCategoryByUid", method = RequestMethod.POST)
    public List<Category> getCategoryByUid(User user) {
        return categoryMapper.getCategoryByUid(user);
    }

    /**
     * Add a category 
     * @param category
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/addCategory?category_name=FISH&color=RED&uid=j2ueh
     */
    @RequestMapping(value = "/addCategory", method = RequestMethod.POST)
    public void addCategory(Category category) {
        category.setCategoryId(IdUtils.getIncreaseIdByNanoTime());
        categoryMapper.addCategory(category);
    }

        /**
     * Delete category and all tasks associated with the category
     * @param category  category entity class 
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/deleteCategoryByCategoryId?category_id=1
     */
    @RequestMapping(value = "/deleteCategoryByCategoryId", method = RequestMethod.POST)
    public void deleteCategoryByCategoryId(Category category) {
        categoryMapper.deleteCategoryByCategoryId(category);
        Task task = new Task();
        task.setCategoryId(category.getCategoryId());
        taskMapper.deleteAllTasksByCategoryId(task);
    }

    /**
     * Get a list of all tasks
     * @return List<Task> a list of all tasks
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getAllTasks
     */
    @RequestMapping(value = "/getAllTasks", produces = { "application/json;charset=UTF-8" })
    public List<Task> getAllTasks() {
        return taskMapper.getAllTasks();
    }

    
    /**
     * add new task
     * @param category
     * @return List<Task> a list of all tasks by category id
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getTasksByCategoryId?category_id=10
     */
    @RequestMapping(value = "/getTasksByCategoryId", method = RequestMethod.POST)
    public List<Task> getTasksByCategoryId(Category category){
        return taskMapper.getTasksByCategoryId(category);
    }

    /**
     * add new task
     * @param task
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/addNewTask?description=beatfishup&category_id=6
     */
    @RequestMapping(value = "/addNewTask", method = RequestMethod.POST)
    public void addNewTask(Task task) {
        task.setTaskId(IdUtils.getIncreaseIdByNanoTime());
        task.setStatus(false);
        taskMapper.addNewTask(task);
    }

    /**
     * update task status
     * @param task
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/updateTaskStatus?task_id=hasjkd&status=0
     */
    @RequestMapping(value = "/updateTaskStatus", method = RequestMethod.POST)
    public void updateTaskStatus(Task task) {
        taskMapper.updateTaskStatus(task);
    }

    /**
     * delete task by task id
     * @param task
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/deleteTaskByTaskId?task_id=hasjkd
     */
    @RequestMapping(value = "/deleteTaskByTaskId", method = RequestMethod.POST)
    public void deleteTaskByTaskId(Task task) {
        taskMapper.deleteTaskByTaskId(task);
    }

    /**
     * delete all completed task associated with a specific category
     * @param task
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/deleteAllCompletedTasksInCategory?category_id=1
     */
    @RequestMapping(value = "/deleteAllCompletedTasksInCategory", method = RequestMethod.POST)
    public void deleteAllCompletedTasksInCategory(Task task) {
        taskMapper.deleteAllCompletedTasksInCategory(task);
    }

    /**
     * Delete all tasks associated with a specific category.
     * @param task
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/deleteAllTasksByCategoryId?category_id=1
     */
    @RequestMapping(value = "/deleteAllTasksByCategoryId", method = RequestMethod.POST)
    public void deleteAllTasksByCategoryId(Task task) {
        taskMapper.deleteAllTasksByCategoryId(task);
    }

    /**
     * Get a count of unfinished tasks and a count of finished task by uid
     * @param user
     * @return Map<String, Integer> key value pairs of finished and unfinished task count
     * 
     * url: http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getTaskStatusCountByUserId?uid=
     */
    @RequestMapping(value = "/getTaskStatusCountByUserId", method = RequestMethod.POST)
    public Map<String, Integer> getTaskStatusCountByUserId(User user){
        List<Category> categories = categoryMapper.getCategoryByUid(user);
        int unfinshedCount = 0;
        int finishedCount = 0;

        for (Category category : categories) {
            List<Task> tasks = taskMapper.getTasksByCategoryId(category);

            for (Task task : tasks) {
                if(!task.getStatus()){
                    
                    unfinshedCount++;
                } else {
                    finishedCount++;
                }
            }
        }
        Map<String, Integer> res = new HashMap<>();
        res.put("unfinshedCount", unfinshedCount);
        res.put("finishedCount", finishedCount);
        return res;
    }
}
