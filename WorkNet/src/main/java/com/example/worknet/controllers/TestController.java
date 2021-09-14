package com.example.worknet.controllers;

import com.example.worknet.model.Project;
import com.example.worknet.model.Task;
import com.example.worknet.repository.TaskRepository;
import com.example.worknet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    TaskRepository taskRepository;

    private Date date;

    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @PostMapping("/task")
    public String createTask() {

         Task task = Task.builder()
                .name("lofasz")
                .assignedUser("Lajoska")
                .status("Started")
                .priority("low")
                 .description("TESTING THIS SHIT")
                .build();

        taskRepository.save(task);

        return "Task succesfully created";
    }

}