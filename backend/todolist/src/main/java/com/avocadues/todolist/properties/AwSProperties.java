package com.avocadues.todolist.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@ConfigurationProperties(prefix = "aws")
@Component
@Data
public class AwSProperties {
    private String xxxx;
    private String yyyy;
    private String zzzz;
    private String aaaa;
    private String bbbb;
}