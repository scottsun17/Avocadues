package com.avocadues.todolist.mapper;

import java.util.List;

import com.avocadues.todolist.entity.Category_Task;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface CategoryTaskMapper {

    @Select("select * from category_task")
    List<Category_Task> getAllCategoryTask();
    
    @Select("select * from category_task where category_id = #{categoryId}")
    List<Category_Task> findTaskListByCategoryId(@Param("categoryId") String categoryId);
}
