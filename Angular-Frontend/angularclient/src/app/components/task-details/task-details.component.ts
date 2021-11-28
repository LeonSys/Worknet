import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../_services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../../models/task.model";
import {UserService} from "../../_services/user.service";
import {User} from "../../models/user.model";
import {TokenStorageService} from "../../_services/token-storage.service";


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;



  currentTask: Task = {
    name: '',
    description: '',
    status:'',
    priority:'',
    assignedUser:'',
    projectNumber: 0
  };
  message = '';

  users?: User[];

  name = '';

  constructor( private taskService: TaskService,
               private  userService: UserService,
               private route: ActivatedRoute,
               private router: Router,
               private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.message = '';
    this.retrieveUsers();
    this.getTask(this.route.snapshot.params.id);

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.name = user.name;
    }

  }

  getTask(id: string): void {
    this.taskService.get(id)
    .subscribe(
      data => {
        this.currentTask = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}


  deleteTask(): void {
    this.taskService.delete(this.currentTask.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/tasks']);
        },
        error => {
          console.log(error);
        });
  }
 ///UPDATEK MÉG MEGKELL ÍRNI

  /*
  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe(
        response => {
          this.currentTutorial.published = status;
          console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }
*/

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

  updateTask(): void {
    this.message = '';

    this.taskService.update(this.currentTask.id, this.currentTask)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This task was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

}
