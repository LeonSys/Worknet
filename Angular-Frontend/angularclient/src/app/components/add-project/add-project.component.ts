import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/task.model";
import {TaskService} from "../../_services/task.service";
import {Project} from "../../models/project.model";
import {ProjectService} from "../../_services/project.service";
import {UserService} from "../../_services/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {


  tasks?: Task[];
  currentTask: Task = {};
  currentIndex = -1;
  name = '';
  message = '';
  modUsers?: User[];
  users?: User[];
  today = Date();


  project: Project = {
    name: '',
    description: '',
    manager:''
  };

  submitted = false;

  constructor(private projectService: ProjectService,
              private  taskService: TaskService,
              private userService: UserService) { }


  saveProject(): void {
    const data = {
      name: this.project.name,
      //tasks: this.project.tasks,
      description: this.project.description,
      manager: this.project.manager
    };

    this.projectService.create(data)
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
    this.retrieveTasks();
    this.retrieveUsers();
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

  setActiveTask(task: Task, index: number): void {
    this.currentTask = task;
    this.currentIndex = index;
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

  newProject(): void {
    this.submitted = false;
    this.project = {
      name: '',
      tasks: []
    }
  }
}
