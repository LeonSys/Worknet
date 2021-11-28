import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {TaskService} from "../_services/task.service";
import {Task} from "../models/task.model";
import {User} from "../models/user.model";
import {TimesheetService} from "../_services/timesheet.service";
import {Timesheet} from "../models/timesheet.model";
import {UserService} from "../_services/user.service";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  tasks?: Task[];
  timesheets?: Timesheet[];
  filteredTasks: Task[] = [];
  name?: String ;
  enableTasks: boolean = false;
  users?: User[];
  userRealName?: String;

  showtasks = false;


  constructor(private token: TokenStorageService, private taskService: TaskService,
              private timesheetService: TimesheetService,
              private  userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    console.log(this.currentUser.id);
    this.retrieveTasks();
    this.retrieveTimeSheets();
    this.retrieveUsers();

  }




  retrieveUsers(): void {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  getTheCurrentUserName(): void {
    this.users?.forEach((user) => {
      if(user.id === this.currentUser.id ){
        this.userRealName = user.name;
        console.log(this.userRealName);
      } else { console.log("FASZGECI");}
    });
    if(this.showtasks == true) {
      this.showtasks = false;
    } else {this.showtasks = true}

}

  retrieveTimeSheets():void {
    this.timesheetService.getAll()
      .subscribe(data => {
        this.timesheets = data;
        console.log(data);
      },
        error => {
        console.log(error);
        });


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

    //this.filterUserTasks();
    //this.log();
  }

  filterUserTasks(): void {
    //let dummyUser: User = this.currentUser;
    let dummyFilteredTasks: Task[] = [];

    this.tasks?.forEach((task) => {
     // console.log(task.assignedUser);
      if(this.currentUser.name === task.assignedUser){
        dummyFilteredTasks.push(task);
      } else { console.log("FASZGECI");}
    });

    console.log();


  dummyFilteredTasks.forEach((task) => {
    this.filteredTasks.push(task);
  });

  this.enableTasks = true;

  }

  log(): void{
  console.log(this.userRealName);
  }
}
