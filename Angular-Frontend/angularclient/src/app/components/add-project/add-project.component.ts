import { Component, OnInit } from '@angular/core';
import {Task} from "../../models/task.model";
import {TaskService} from "../../_services/task.service";
import {Project} from "../../models/project.model";
import {ProjectService} from "../../_services/project.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  dummyTask: Task = {
    name: '',
    description: '',
    status:'',
    priority:'',
    assignedUser:'',
  };


  tasks?: Task[] = [this.dummyTask];
  currentTask: Task = {};
  currentIndex = -1;
  name = '';


  project: Project = {
    name: '',
    tasks: []
  };

  submitted = false;

  constructor(private projectService: ProjectService,private  taskService: TaskService) { }

  //taskStatusOptions: Observable<TaskCategories>;





  saveProject(): void {
    const data = {
      name: this.project.name,
      tasks: this.project.tasks
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
  }



  newProject(): void {
    this.submitted = false;
    this.project = {
      name: '',
      tasks: []
    };
  }

}
