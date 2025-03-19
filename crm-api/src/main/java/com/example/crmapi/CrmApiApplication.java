package com.example.crmapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.crmapi")
public class CrmApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrmApiApplication.class, args);
	}

}
