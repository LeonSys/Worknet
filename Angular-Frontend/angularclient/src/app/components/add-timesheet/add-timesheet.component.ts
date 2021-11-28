import { Component, OnInit } from '@angular/core';
import {TimesheetService} from "../../_services/timesheet.service";
import {Timesheet} from "../../models/timesheet.model";
import {UserService} from "../../_services/user.service";
import {TaskService} from "../../_services/task.service";
import {User} from "../../models/user.model";
import {Task} from "../../models/task.model";
import {Observable} from "rxjs";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.css']
})
export class AddTimesheetComponent implements OnInit {


  timesheet: Timesheet = {
    start: '',
    end: '',
    creationDate: new Date(),
    occupiedTask: ''

}
  submitted:boolean = false;

//  users?: User[];
  tasks?: Task[];
  currentUser: any;


  constructor(private timesheetService: TimesheetService,
              private userService: UserService,
              private taskService: TaskService,
              private tokenStorageService: TokenStorageService

             ) { }

  saveTimesheet(): void {
    const data = {
      start: this.timesheet.start,
      end: this.timesheet.end,
      creationDate: this.timesheet.creationDate,
      userIdentificator: this.currentUser.id,
      occupiedTask: this.timesheet.occupiedTask,

    };
    this.timesheetService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }




  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser()
    this.retrieveTasks();

  }

  getTheLoggedInUser(){
   // this.currentUser = this.tokenStorageService.getUser()
  }


  retrieveTasks(): void {
    this.taskService.getAll()
      .subscribe(
        data => {
          this.tasks = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

 /* retrieveUsers(): void {
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
 */
  newTimesheet(): void {
    this.submitted = false;
    this.timesheet = {
      start: '',
      end: '',
      creationDate: new Date(),
      userIdentificator: 0,
      occupiedTask: ''
    };
  }



}
