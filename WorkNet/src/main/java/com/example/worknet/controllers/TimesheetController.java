package com.example.worknet.controllers;

import com.example.worknet.model.Task;
import com.example.worknet.model.Timesheet;
import com.example.worknet.repository.TimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Period;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class TimesheetController {


    @Autowired
    TimesheetRepository timesheetRepository;

    @GetMapping("/timesheets")
    public ResponseEntity<List<Timesheet>> getAllTimesheets(@RequestParam(required = false) String name) {
        try {
            List<Timesheet> timesheets = new ArrayList<Timesheet>();

            if (name == null)
                timesheetRepository.findAll().forEach(timesheets::add);
            else
                //timesheetRepository.findByNameContaining(name).forEach(timesheets::add);

            if (timesheets.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(timesheets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @GetMapping("/timehsheets/{id}")
    public ResponseEntity<Timesheet> getTaskById(@PathVariable("id") long id) {
        Optional<Timesheet> timesheetData = timesheetRepository.findById(id);

        if (timesheetData.isPresent()) {
            return new ResponseEntity<>(timesheetData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/timesheets")
    public ResponseEntity<Timesheet> createTimesheet(@RequestBody Timesheet timesheet) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String strDate= formatter.format(timesheet.getCreationDate());

        try {
            Timesheet _timesheet = timesheetRepository
                    .save(Timesheet.builder()

                            .start(timesheet.getStart())
                            .end(timesheet.getEnd())
                            .userIdentificator(timesheet.getUserIdentificator())
                            .occupiedTask(timesheet.getOccupiedTask())
                            .creationDate(timesheet.getCreationDate())
                            .normalDateFormat(strDate)
                            .build());

            return new ResponseEntity<>(_timesheet, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/timesheets/{id}")
    public ResponseEntity<HttpStatus> deleteTimesheet(@PathVariable("id") long id) {
        try {
            timesheetRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/timesheets")
    public ResponseEntity<HttpStatus> deleteAllTimesheets() {
        try {
            timesheetRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/timesheets/{id}")
    public ResponseEntity<Timesheet> updateTimesheet(@PathVariable("id") long id, @RequestBody Timesheet timesheet) {
        Optional<Timesheet> timesheetData = timesheetRepository.findById(id);

        if (timesheetData.isPresent()) {
            Timesheet _timesheet = timesheetData.get();
            _timesheet.setCreationDate(timesheet.getCreationDate());
            _timesheet.setStart(timesheet.getStart());
            _timesheet.setEnd(timesheet.getEnd());
            return new ResponseEntity<>(timesheetRepository.save(_timesheet), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
