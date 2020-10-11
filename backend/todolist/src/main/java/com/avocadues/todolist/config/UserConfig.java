package com.avocadues.todolist.config;

import com.avocadues.todolist.entity.User;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
