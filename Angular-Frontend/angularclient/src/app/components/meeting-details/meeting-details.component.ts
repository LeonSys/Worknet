import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project.model";
import {Task} from "../../models/task.model";
import {TaskService} from "../../_services/task.service";
import {UserService} from "../../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../_services/project.service";
import {Meeting} from "../../models/meeting.model";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {

  currentMeeting: Meeting = {
    name: '',
    creationDate: new Date(),
    exactTime: ''
  }

  currentUser: User = {};
  currentIndex = -1;
  clicked?: boolean;
  today = new Date();

  users?:User[]

  constructor(
               private  userService: UserService,
               private route: ActivatedRoute,
               private router: Router,
               private  meetingService: ProjectService) { }

  ngOnInit(): void {
    this.getMeeting(this.route.snapshot.params.id);
    this.retrieveUsers();
  }


  getMeeting(id: string): void {
    this.meetingService.get(id)
      .subscribe(
        data => {
          this.currentMeeting = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
    this.clicked = true;
  }



  addUserToThisMeeting(): void {

    this.currentUser.meetingNumber = this.currentMeeting.id;
    this.currentUser.meetingNumber = this.currentMeeting.id
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
