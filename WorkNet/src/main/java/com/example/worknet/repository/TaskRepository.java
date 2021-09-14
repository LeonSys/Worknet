package com.example.worknet.repository;

import com.example.worknet.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Optional<Task> findByName(String taskname);

    Boolean existsByname(String taskname);

   // List<Task> findall();

}


