import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/task.model";
import {User} from "../../models/user.model";
import {Project} from "../../models/project.model";
import {Meeting} from "../../models/meeting.model";
import {ProjectService} from "../../_services/project.service";
import {TaskService} from "../../_services/task.service";
import {UserService} from "../../_services/user.service";
import {MeetingService} from "../../_services/meeting.service";

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {


  users?: User[];
  currentTask: User = {};
  currentIndex = -1;
  name = '';
  message = '';

  meeting: Meeting = {
    name: '',
    creationDate: new Date(),
    exactTime: ''
  };

  today = new Date();
  todayInString = this.today.toISOString().split('T')[0];


  constructor(private meetingService: MeetingService,
              private  taskService: TaskService,
              private userService: UserService) { }

  ngOnInit(): void {
   // this.retrieveUsers();
  }

  submitted = false;

  saveMeeting(): void {
    const data = {
      name: this.meeting.name,
      meetingDate: this.meeting.creationDate,
      exactTime: this.meeting.exactTime
    };

    this.meetingService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }


  newMeeting(): void {
    this.submitted = false;
    this.meeting = {
      name: '',
      users: []
    }
  }

}
