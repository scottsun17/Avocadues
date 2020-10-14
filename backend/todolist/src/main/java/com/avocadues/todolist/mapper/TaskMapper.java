package com.avocadues.todolist.mapper;

import lombok.Data;
import java.util.List;

import com.avocadues.todolist.entity.Task;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Data
public interface TaskMapper {
    @Select("select * from task")
    List<Task> getAllTasks();

    @Select("select * from task where task_id = #{id}")
    Task findOneById(@Param("id") Integer id);
}
