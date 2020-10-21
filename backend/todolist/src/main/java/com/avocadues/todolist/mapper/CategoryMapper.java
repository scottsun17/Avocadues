package com.avocadues.todolist.mapper;

import java.util.List;

import com.avocadues.todolist.entity.Category;
import com.avocadues.todolist.entity.User;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

public interface CategoryMapper {
    @Select("select * from category")
    public List<Category> getAllCategories();

    @Select("select * from category where uid = #{uid}")
    public List<Category> getCategoryByUid(User user);

    @Insert("insert into category(category_id, category_name, color, uid) values(#{category_id}, #{category_name}, #{color}, #{uid})")
    public void addCategory(Category category);

    @Delete("delete from category where category_id = #{category_id}")
    public void deleteCategoryByCategoryId(Category category);
}
