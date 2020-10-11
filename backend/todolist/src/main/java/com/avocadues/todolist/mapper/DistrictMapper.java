package com.avocadues.todolist.mapper;

import java.util.List;

import com.avocadues.todolist.entity.District;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;


public interface DistrictMapper {

    @Select("select * from district")
    List<District> findAll();

    @Select("select * from district where id = #{id}")
    District findOneById(@Param("id") Integer id);
}
