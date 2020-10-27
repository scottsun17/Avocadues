package com.avocadues.todolist;

// import org.apache.catalina.connector.Connector;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.quartz.QuartzAutoConfiguration;
// import org.springframework.context.annotation.Bean;
// import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
// import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
// import org.apache.tomcat.util.descriptor.web.SecurityCollection;
// import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
// import org.apache.catalina.Context;

@SpringBootApplication(exclude = QuartzAutoConfiguration.class)
@MapperScan(basePackages = "com.avocadues.todolist.mapper")
public class TodolistApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodolistApplication.class, args);
	}

	// @Bean
	// public ServletWebServerFactory servletContainer() {
	// 	TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
	// 		@Override
	// 		protected void postProcessContext(Context context) {
	// 			SecurityConstraint securityConstraint = new SecurityConstraint();
	// 			securityConstraint.setUserConstraint("CONFIDENTIAL");
	// 			SecurityCollection collection = new SecurityCollection();
	// 			collection.addPattern("/*");
	// 			securityConstraint.addCollection(collection);
	// 			context.addConstraint(securityConstraint);
	// 		}
	// 	};
	// 	tomcat.addAdditionalTomcatConnectors(redirectConnector());
	// 	return tomcat;
	// }
	
	// private Connector redirectConnector() {
	// 	Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
	// 	connector.setScheme("http");
	// 	connector.setPort(8083);
	// 	connector.setSecure(false);
	// 	connector.setRedirectPort(443);
	// 	return connector;
	// }

}
