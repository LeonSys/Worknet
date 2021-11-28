import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project.model";
import {ProjectService} from "../../_services/project.service";
import {Task} from "../../models/task.model";
import {Meeting} from "../../models/meeting.model";
import {MeetingService} from "../../_services/meeting.service";

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

  meetings?: Meeting[];
  currentMeeting: Meeting = {};
  currentIndex = -1;
  name = '';


  constructor(private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.retrieveMeetings();
  }


  retrieveMeetings(): void {
    this.meetingService.getAll()
      .subscribe(
        data => {
          this.meetings = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveMeetings();
    this.currentMeeting = {};
    this.currentIndex = -1;
  }

  setActiveMeeting(meeting: Meeting, index: number): void {
    this.currentMeeting = meeting;
    this.currentIndex = index;
  }

}
