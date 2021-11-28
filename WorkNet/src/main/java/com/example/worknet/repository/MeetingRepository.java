package com.example.worknet.repository;

import com.example.worknet.model.Meeting;
import com.example.worknet.model.Project;
import com.example.worknet.model.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
}
