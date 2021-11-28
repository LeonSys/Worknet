import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/task.model";
import {TaskService} from "../../_services/task.service";
import {TokenStorageService} from "../../_services/token-storage.service";
import {UserService} from "../../_services/user.service";
import {async, Observable} from "rxjs";
import {User} from "../../models/user.model";
import {AngularWorkspace} from "@angular/cli/utilities/config";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  userIdToNavigate = 0;

  noUserAssigned = false;



  tasks?: Task[];
  currentTask: Task = {};
  currentIndex = -1;
  name = '';
  users?: User[];

  currentUser: User = {};
  currentUserIndex = -1;

  constructor(private taskService: TaskService, private tokenStorageService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveTasks();
    this.retrieveUsers();

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.name = user.name;
    }

  }


  getTheIdOfTheTaskAssignedUser():number{
    let assignedUserId: number = 0;

    this.users?.forEach((user) => {
      if(user.name === this.currentTask.assignedUser){
        assignedUserId = user.id
      } else {}

    });
      return assignedUserId;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentUserIndex = index;
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

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = {};
    this.currentIndex = -1;
  }

  setActiveTask(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
    if(task.assignedUser === "") {
      this.noUserAssigned = true;
    } else{this.noUserAssigned = false;}
  }

  removeAllTasks(): void {
    this.taskService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchName(): void {
    this.currentTask = {};
    this.currentIndex = -1;

    this.taskService.findByName(this.name)
      .subscribe(
        data => {
          this.tasks = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


}
