package com.example.worknet.controllers;

import com.example.worknet.model.Meeting;
import com.example.worknet.model.Project;
import com.example.worknet.model.Timesheet;
import com.example.worknet.repository.MeetingRepository;
import com.example.worknet.repository.TimesheetRepository;
import com.example.worknet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Date;


@RestController
@RequestMapping("/api")
public class MeetingController {

    @Autowired
    MeetingRepository meetingRepository;


    @Autowired
    UserRepository userRepository;


    @GetMapping("/meetings")
    public ResponseEntity<List<Meeting>> getAllMeetings(@RequestParam(required = false) String name) {
        try {
            List<Meeting> meetings = new ArrayList<Meeting>();

            if (name == null)
                meetingRepository.findAll().forEach(meetings::add);
            else
               // meetingRepository.findByNameContaining(name).forEach(meetings::add);

            if (meetings.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(meetings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/meetings")
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String strDate= formatter.format(meeting.getCreationDate());

        try {
            Meeting _meeting = meetingRepository
                    .save(Meeting.builder()
                            .name(meeting.getName())
                            .creationDate(meeting.getCreationDate())
                            .normalDateFormat(strDate)
                            .exactTime(meeting.getExactTime())
                            .build());

            return new ResponseEntity<>(_meeting, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/meetings/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable("id") long id) {
        Optional<Meeting> meetingData = meetingRepository.findById(id);

        if (meetingData.isPresent()) {
            return new ResponseEntity<>(meetingData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/meetings/{id}")
    public ResponseEntity<HttpStatus> deleteMeeting(@PathVariable("id") long id) {
        try {
            meetingRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/meetings")
    public ResponseEntity<HttpStatus> deleteAllMeetings() {
        try {
            meetingRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

   /* @PutMapping("/meetings/{id}")
    public ResponseEntity<Meeting> updateProject(@PathVariable("id") long id, @RequestBody Meeting meeting) {
        Optional<Meeting> meetingData = meetingRepository.findById(id);

        if (meetingData.isPresent()) {
            Meeting _meeting = meetingData.get();
            _meeting.setName(project.getName());
            _meeting.setDescription(project.getDescription());
            return new ResponseEntity<>(projectRepository.save(_meeting), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/

}
