package com.example.accessingdatamysql;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // You can restrict paths with specific patterns if needed
                .allowedOrigins("http://localhost:3000") // The frontend server origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allowed headers
                .allowCredentials(true);
    }
}
