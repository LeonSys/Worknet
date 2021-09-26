package com.example.worknet.repository;

import com.example.worknet.model.Project;
import com.example.worknet.model.Task;
import com.example.worknet.model.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {


    Optional<Project> findByName(String projectname);

    Boolean existsByname(String projectname);

    List<Project> findByNameContaining(String name);

}
