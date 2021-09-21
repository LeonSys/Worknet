package com.example.worknet.controllers;

import com.example.worknet.model.Task;
import com.example.worknet.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TaskController {


    @Autowired
    TaskRepository taskRepository;

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks(@RequestParam(required = false) String name) {
        try {
            List<Task> tasks = new ArrayList<Task>();

            if (name == null)
                taskRepository.findAll().forEach(tasks::add);
            else
                taskRepository.findByNameContaining(name).forEach(tasks::add);

            if (tasks.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") long id) {
        Optional<Task> taskData = taskRepository.findById(id);

        if (taskData.isPresent()) {
            return new ResponseEntity<>(taskData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/tasks")
    public ResponseEntity<Task> createTutorial(@RequestBody Task task) {
        try {


            Task _task = taskRepository
                    .save(Task.builder()
                            .description(task.getDescription())
                            .priority(task.getPriority())
                            .status(task.getStatus())
                            .assignedUser(task.getAssignedUser())
                            .name(task.getName())
                            .build());

            return new ResponseEntity<>(_task, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable("id") long id) {
        try {
            taskRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/tasks")
    public ResponseEntity<HttpStatus> deleteAllTasks() {
        try {
            taskRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    ///BOOLEAN ALAPJÁN TALÁL DE MÉG NINCS BOOLEAN PROPERTYJE A TASKNAK

    /*
    @GetMapping("/tutorials/published")
    public ResponseEntity<List<Tutorial>> findByPublished() {
        try {
            List<Tutorial> tutorials = tutorialRepository.findByPublished(true);

            if (tutorials.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tutorials, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
     */

    //////////
        // TASK modiify egyenlőre had pihenjen
    /////////
   @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable("id") long id, @RequestBody Task task) {
        Optional<Task> taskData = taskRepository.findById(id);

        if (taskData.isPresent()) {
            Task _task = taskData.get();
            _task.setName(task.getName());
            _task.setDescription(task.getDescription());
            _task.setPriority(task.getPriority());
            return new ResponseEntity<>(taskRepository.save(_task), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //////////
    // TASK modiify egyenlőre had pihenjen
    /////////


}
