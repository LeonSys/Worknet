import { Component, OnInit } from '@angular/core';
import {Project} from "../../models/project.model";
import {TaskService} from "../../_services/task.service";
import {UserService} from "../../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../_services/project.service";
import {Task} from "../../models/task.model";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  currentProject: Project = {
    name: '',
    description: ''
  }

  currentTask: Task = {};
  currentIndex = -1;
  clicked?: boolean;
  today = new Date();

  tasks?:Task[]

  constructor( private taskService: TaskService,
               private  userService: UserService,
               private route: ActivatedRoute,
               private router: Router,
               private  projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProject(this.route.snapshot.params.id);
    this.retrieveTasks();
  }


  getProject(id: string): void {
    this.projectService.get(id)
      .subscribe(
        data => {
          this.currentProject = data;
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

  setActiveTask(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
    this.clicked = true;
  }



  addTaskToThisProject(): void {
    this.currentTask.projectNumber = this.currentProject.id;
    this.taskService.update(this.currentTask.id, this.currentTask)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }



}
