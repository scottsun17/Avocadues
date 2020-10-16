package com.avocadues.todolist.mapper;

import java.util.List;

import com.avocadues.todolist.entity.Category;
import com.avocadues.todolist.entity.Task;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;


public interface TaskMapper {
    @Select("select * from task")
    public List<Task> getAllTasks();

    @Select("select * from task where category_id = #{category_id}")
    public List<Task> getTasksByCategoryId(Category category);

    @Insert("insert into task(task_id, description, status, category_id) values(#{task_id}, #{description}, #{status}, #{category_id})")
    public void addNewTask(Task task);

    @Update("update task set status = #{status} where task_id = #{task_id}")
    public void updateTaskStatus(Task task);

    @Delete("delete from task where task_id = #{task_id}")
    public void deleteTaskByTaskId(Task task);

    @Delete("delete from task where status = 1 and category_id = #{category_id}")
    public void deleteAllCompletedTasksInCategory(Task task);

    @Delete("delete from task where category_id = #{category_id}")
    public void deleteAllTasksByCategoryId(Task task);

}
