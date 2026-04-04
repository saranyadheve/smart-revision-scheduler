package com.revision.smart_revision_scheduler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SmartRevisionSchedulerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartRevisionSchedulerApplication.class, args);
	}

}
