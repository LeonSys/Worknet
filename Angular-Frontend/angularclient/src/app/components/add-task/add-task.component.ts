import { Component, OnInit } from '@angular/core';
import { Task } from "../../models/task.model";
import {TaskService} from "../../_services/task.service";
import {Observable} from "rxjs";
import {UserService} from "../../_services/user.service";
import {User} from "../../models/user.model";
import {AppComponent} from "../../app.component";



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {


  task: Task = {
    description: '',
    priority: '',
    status: '',
    assignedUser: '',
    name: '',
    deadline: new Date()
  };
  submitted = false;

  today = new Date();
  todayInString = this.today.toISOString().split('T')[0];
  constructor(private taskService: TaskService,private  userService: UserService) { }

  //taskStatusOptions: Observable<TaskCategories>;


  users?: User[];


  saveTask(): void {
    const data = {
      name: this.task.name,
      priority: this.task.priority,
      status: this.task.status,
      description: this.task.description,
      assignedUser: this.task.assignedUser,
      deadline: this.task.deadline
    };

    this.taskService.create(data)
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
    this.retrieveUsers();
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

  newTask(): void {
    this.submitted = false;
    this.task = {
      name: '',
      description: '',
      priority: '',
      status: '',
      assignedUser: '',
      deadline: new Date()
    };
  }

}
