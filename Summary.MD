## I. SpringBoot Intro

SpringBoot is a  tool set developed by Pivotal. It consolidates Spring, Spring MVC, data-jpa and other common tools used into one package for quick development.



### Features

- do not need template configuration</li

- when using third party framework/tools, only need to import starter package and SpringBoot will automatically organize it for you
  - SpringBoot has already organized those package and we don't need to write configuration for those third party package. 
- SpringBoot default to **only one** **.properties** configuration file. It **does not** recommend xml file. It also use **.java file** to edit configuration information.

- SpringBoot project use jar file to deply and automatically depends on Tomcat container, providing configuration for different environment
- microservice SpringCloud is based on Springboot



## II. SpringBoot menu

#### 1. pom.xml 

- point to a parent project; 
  - mark the project as spring boot project 
  - automatically specify dependency version number if it is spring boot dependency, such as starter-web
- project metadata:
  - project name
  - group id 
  - artifact id
- set properties information
  - java version number
- import dependency
  - spring boot project default to have spring-boot-starter and spring boot starter test 
- plugin:
  - spring boot maven plug in

### 2. gitignore file

- default to help us ignore  some files



### 3. src catelog

```
-src

​	-main

​		-java

​			-package

​				main.java							# controller files must be stored within the same or child level folder with 

​		-resources

​				-static								# static files html, css

​				-templates							# template files

​			application.properties					# the only configuration file in spring boot

​	-test # only for testing purpose
```



### 4. Three different ways to start a SpringBoot project

1. run main.java file

2. use maven cmd to run SpringBoot project

   ```
   mvn spring-boot:run
   ```

3. use jar file to run 

   ```
   mvn clean package # generate jar package
   java -jar .\projectname.jar
   ```



## III. SpringBoot Notation

1. @Configuration and @Bean

```
it is simialr to the XML configuration 


#Configuration notation is label to the beans label
@Bean notation is equivalent to to the bean label
	id ="method name | the name property in notation" (method name has higher priority than class)
	class = "return value from the method"
```



```java
@Configuration 
public class UserConfig {
    
    @Bean(name = "user1")  // construct a user and put in the spring container 
    public User user(){
        User user = new User();
        user.setId(1);
        user.setName("Scott");
        return user;

    }

    /*
    <beans ...>             @Configureation
        <bean id="user1" class="com.avocadues.entity.User" />
    </beans>
    */

}
```

2. @SpringBootApplication

   @SpringBootApplication is a combination of notations:

   - @SpringBootConfiguration
   - @EnableAutoConfiguration
   - @ComponentScan

---

​	a. @SpringbootConfiguration is the same @configuration notation

​	b. @EnableAutoConfiguration helps to enable auto implement dependencies that we added to the pom.xml; When SpringBoot project starts, it runs a 	SpringFactoriesLoader class that loads META/INF/spring.factories configuration class (classes that have been started), then use SpringFactoriesLoader's load function to load through for loop

​	Pro: save time from loading dependencies

​	con: if you import a starter dependencies, you must fill in its configuration info



​	Manually exclude configuration from auto configuration: @SpringBootApplication(exlcude=QuartAutoConfiguration.class) (quart is an example, here can be class you want to exclude)

​	@ComponentScan is the same as <context:component-scan basePackage="packagename" />





## IV. SpringBoot common configuration

#### 4.1 SpringBoot configuration format

<p>It supports properties, yml and json format. 
    It is recommended to use yml file:
    <li>yml helps to organize file location</li>
    <li>yml is lighter than properties file</li>
   However, must follow its format strictly
   must have a space between ':' and value => ex. server: 8080



#### 4.2 Multi-Environment Config

<p>add to application.yml
</p>

```yml
spring:
  profiles:
    active: dev #point to application-dev.yml
```

---

when deploying project, we can use 

```
java -jar.jar --spring.profiles.active=enventmentname
```



#### 4.3 Import External Config Files

use @Value notation rto get properties.yml data;

if yml file has a lot user specified data with the same prefix, we can use properties.java file to organize

```java
@ConfigurationProperties(prefix = "aws")
@Component
@Data
public class AwSProperties {
    private String xxxx;
    private String yyyy;
    private String zzzz;
    private String aaaa;
    private String bbbb;
    
    ...
}
```



```yml
aws:
    xxxx: xxxxxxxxxxxxx
    yyyy: yyyyyyyyyyyyy
    zzzz: zzzzzzzzzzzzz
    aaaa: aaaaaaaaaaaaa
    bbbb: bbbbbbbbbbbbb
    ...
```



#### 4.4 SpringBoot Hot Reload

1. import dependency

```xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-devtools</artifactId>
			<optional>true</optional>
		</dependency>
```

2. IDEA must set to auto compile 



## V. Mybatis

1. import dependency

```xml
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
		</dependency>

		<!-- https://mvnrepository.com/artifact/com.alibaba/druid-spring-boot-starter -->
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid-spring-boot-starter</artifactId>
			<version>1.1.10</version>
		</dependency>

		<!-- https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter -->
		<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
			<version>1.3.2</version>
		</dependency>
```



2. config 
   - create entity class

```java
@Data
public class Air implements Serializable {
    private Integer id;
    private Integer district_Id;
    private java.util.Date monitorTime;
    private Integer pm10;
    private Integer pm25;
    private String monitoringStation;
    private java.util.Date lastModifyTime;

}

//===========================================

@Data
public class District implements Serializable {
    private Integer id;
    private String name;
}

```

---

```java
//create mapper interface

public class AirMapper {
    List<Air> findAll();
    
}

//add mapper interface to the application.java file
@MapperScan(basePackages = "com.avocadues.todolist.mapper")
```

---

```xml
// create reflection file under resources menu

<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.avocadues.todolist.mapper.AirMapper">
    <!-- List<Air> findAll(); -->
    <select id="findAll" resultType="Air">
        select * from air
    </select>
</mapper>


```

---

```yml
<!-- add yml file configuration -->
# mybatis config
mybatis: 
    mapper-locations: classpath:mapper/*.xml
    type-aliases-package: com.avocadues.todolist.entity
    configuration:
        map-underscore-to-camel-case: true 
```

```yml
# add database driver to yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql:///air?serverTimeZone=UTC
    username: root
    password: Pk-87654321
    type: com.alibaba.druid.pool.DruidDataSource
    
```

3. Testing

create a testing class under test menu

https://www.bilibili.com/video/BV1ti4y1G7yX?p=12

![image-20201010182754462](img\springboottest.png)

```java
package com.avocadues.todolist.mapper;

import java.util.List;

import com.avocadues.todolist.TodolistApplicationTests;
import com.avocadues.todolist.entity.Air;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class AirMapperTest extends TodolistApplicationTests {
    @Autowired
    private AirMapper airMapper;

    @Test
    void findAll(){
        List<Air> list = airMapper.findAll();
        for(Air air : list){
            System.out.println(air);
        }
    }
}
```



#### 5.2 Notation on Mybatis

---

1. create District Mapper interface

```java
public interface DistrictMapper {
    List<District> findAll();
}
```

2. add Mybatis notation

for CURD operation, Mybatis provided @Insert @Delete @Update @Select

need to include @MapperScan notation

```java
    @Select("select * from district")
    List<District> findAll();

    @Select("select * from district where id = #{id}")
    District findOneById(@Param("id") Integer id);
```

if useing Mybatis notation, you dont need to include the following in the yml file

```yml
    mapper-locations: classpath:mapper/*.xml
    type-aliases-package: com.avocadues.todolist.entity
```



3. test, use SQL

```yml
# check for sql 
logging:
  level: 
    com.avocadues.todolist.mapper: DEBUG 
```

```java
public class DistrictMapperTest extends TodolistApplicationTests{
    
    @Autowired
    private DistrictMapper mapper;

    @Test
    void findAll(){
        List<District> list = mapper.findAll();
        for(District district : list){
            System.out.println(district);
        }
    }

    @Test
    void findOneById(){
        District district = mapper.findOneById(1);
        System.out.println(district);
    }
}
```



4. SpringBoot page

- import dependency

```xml
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper-spring-boot-starter -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.2.5</version>
</dependency>

```

























