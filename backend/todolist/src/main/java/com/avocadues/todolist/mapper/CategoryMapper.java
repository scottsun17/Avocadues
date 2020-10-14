package com.avocadues.todolist.mapper;

import java.util.List;

import com.avocadues.todolist.entity.Category;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

public interface CategoryMapper {
    @Select("select * from category")
    List<Category> getAllCategories();
    
    @Select("select * from category where category_id = #{categoryId}")
    List<Category> findCategoryListByCategoryId(@Param("categoryId") String categoryId);
}
