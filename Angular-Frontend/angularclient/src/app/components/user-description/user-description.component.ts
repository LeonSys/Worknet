import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";
import {ProjectService} from "../../_services/project.service";
import {Project} from "../../models/project.model";
import {TaskService} from "../../_services/task.service";
import {Task} from "../../models/task.model";

  @Component({
    selector: 'app-user-description',
    templateUrl: './user-description.component.html',
    styleUrls: ['./user-description.component.css']
  })
  export class UserDescriptionComponent implements OnInit {

    user: User = {
      name:'',
      email:'',
      username:'',
      position:'',
      phoneNumber:'',
      birthDate:''
    }

    projects?: Project[];
    tasks?: Task[];
    message = '';
    constructor(private  userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private projectService: ProjectService,
                private taskService: TaskService) { }


ngOnInit(): void {
      this.message = '';
      this.getUser(this.route.snapshot.params.id);
      this.retrieveProjects();
      this.retrieveTasks();
    }

    getUser(id: string) {
      this.userService.get(id).subscribe(data => {
        this.user = data;
        console.log(data);
      },error => {
        console.log(error);
      });
    }


    retrieveProjects(): void {
      this.projectService.getAll()
        .subscribe(
          data => {
            this.projects = data;
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

  }
