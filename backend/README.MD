## Introduction

Framework: SpringBoot v2.3.4

Dependencies:

| Dependency                                                   | Version |
| :----------------------------------------------------------- | ------- |
| [Tomcat Embed Jasper](https://mvnrepository.com/artifact/org.apache.tomcat.embed/tomcat-embed-jasper) |         |
| [MySQL Connector/J](https://mvnrepository.com/artifact/mysql/mysql-connector-java) |         |
| [Druid Spring Boot Starter](https://mvnrepository.com/artifact/com.alibaba/druid-spring-boot-starter) | 1.1.10  |
| [Spring Boot DevTools](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-devtools) |         |
| [Spring Boot Configuration Processor](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-configuration-processor) |         |
| [Project Lombok](https://mvnrepository.com/artifact/org.projectlombok/lombok) |         |
| [MyBatis Spring Boot Starter](https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter) | 2.0.1   |
| [Spring Boot Starter Test](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test) (JUnit) |         |



# Method Summary

### User

| Modifier and Type | Method and Description                  |
| ----------------- | --------------------------------------- |
| void              | <a href=#addUser>addUser(User user)</a> |
| List<User>        | <a href=#getalluser>getAllUser()</a>    |



### Category

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| List<Category>    | <a href=#getAllCategories>getAllCategories()</a>             |
| List<Category>    | <a href=#getCategoryByUid>getCategoryByUid(User user)</a>    |
| void              | <a href=#addCategory>addCategory(Category category)</a>      |
| void              | <a href="#deleteCategoryByCategoryId">deleteCategoryByCategoryId(Category category)</a> |



### Task

| Modifier and Type | Method and Description                                       |
| ----------------- | ------------------------------------------------------------ |
| List<Task>        | <a href=#getAllTasks>getAllTasks()</a>                       |
| List<Task>        | <a href=#getTasksByCategoryId>getTasksByCategoryId(Category category)</a> |
| void              | <a href=#addNewTask>addNewTask(Task task)</a>                |
| void              | <a href="#updateTaskStatus">updateTaskStatus(Task task)</a>  |
| void              | <a href="#deleteTaskByTaskId">deleteTaskByTaskId(Task task)</a> |
| void              | <a href="#deleteAllCompletedTasksInCategory">deleteAllCompletedTasksInCategory(Task task)</a> |
| void              | <a href="#deleteAllTasksByCategoryId">deleteAllTasksByCategoryId(Task task)</a> |



# Method Detail



## User

#### addUser<a id="addUser"> </a>

public void addUser(User user)

Add a new user to the user database

<b>Parameters:</b>

​	user - User entity

<b>Return:</b>

​	void

<B>URL:</B> ``http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/addUser?uid= ``

<b>Method:</b> POST

---

#### getAllUser <a id="getAllUser "> </a>

public List<User> gettAllUser()

Get a list of all user uid

<b>Parameters:</b> 

<b>Return:</b>

​	List<User>	a list of all users

<B>URL:</B> ``http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getAllUsers ``

<b>Method:</b> GET

 

## Category

#### getAllCategories() <a id="getAllCategories"> </a>

 public List<Category> getAllCategories();

Get a list of all categories

<b>Parameters:</b>

<b>Return:</b>

​	List<Category>	a list of all Categories

<B>URL:</b> ``http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getAllCategories``

<b>Method:</b> GET

---

#### getCategoryByUid(User user) <a id="getCategoryByUid"> </a>

public List<Category> getCategoryByUid(User user)

Get a list of categories by user uid

<b>Parameters:</b> 

​	user - User entity

<b>Return:</b>

​	List<Category>	a list of all Categories identified by uid

<B>URL:</b> ``http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getCategoryByUid?uid=``

<b>Method:</b> POST

---

#### addCategory(Category category)<a id="addCategory"> </a>

public void addCategory(Category category)

Add a new Category

<b>Parameters:</b>

​	category - Category entity

<b>Return:</b>

​	void

<B>URL:</b> ``http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/addCategory?category_id= &category_name= &color= &uid= ``

<b>Method:</b> POST

---

#### deleteCategoryByCategoryId(Category category)<a id="deleteCategoryByCategoryId"> </a>

public void deleteCategoryByCategoryId(Category category)

Delete a category by category id

<b>Parameters:</b>

​	category - Category entity

<b>Return:</b>

​	void

<B>URL:</b> ``http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/deleteAllTasksByCategoryId?category_id=``

<b>Method:</b> POST



## Task

#### getAllTasks()<a id="getAllTasks"> </a>

public List<Task> getAllTasks()

Get a list of all tasks

<b>Parameters:</b>

<b>Return:</b>

​	List<Task>	A list of all tasks

<B>URL:</b> ``http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getAllTasks``

<b>Method:</b> GET

---

#### getTasksByCategoryId()<a id="getTasksByCategoryId"> </a>

public List<Task> getTasksByCategoryId(Category category)

Get a list of tasks by category id

<b>Parameters:</b>

​	category - Category entity

<b>Return:</b>

​	List<Task>	A list of all tasks by category id

<B>URL:</b> ``http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/getTasksByCategoryId?category_id=``

<b>Method:</b> POST

---

#### addNewTask()<a id="getTasksByCategoryId"> </a>

public void addNewTask(Task task)

Add a new task

<b>Parameters:</b>

​	task- Task entity

<b>Return:</b>

<B>URL:</b> ``http://ec2-18-217-91-161.us-east-2.compute.amazonaws.com:8080/addNewTask?task_id= &description= &status= &category_id= ``

<b>Method:</b> POST

---



