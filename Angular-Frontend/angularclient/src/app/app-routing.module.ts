import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {AddTaskComponent} from "./components/add-task/add-task.component";
import {TaskDetailsComponent} from "./components/task-details/task-details.component";
import {TasksListComponent} from "./components/tasks-list/tasks-list.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {AddProjectComponent} from "./components/add-project/add-project.component";
import {ProjectListComponent} from "./components/project-list/project-list.component";
import {UserDescriptionComponent} from "./components/user-description/user-description.component";
import {ProjectDetailsComponent} from "./components/project-details/project-details.component";
import {AddTimesheetComponent} from "./components/add-timesheet/add-timesheet.component";
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {AddMeetingComponent} from "./components/add-meeting/add-meeting.component";
import {MeetingListComponent} from "./components/meeting-list/meeting-list.component";
import {MeetingDetailsComponent} from "./components/meeting-details/meeting-details.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'tasks', component: TasksListComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'addProject', component: AddProjectComponent },
  { path: 'listOfTheUsers', component: UserListComponent },
  { path: 'listOfTheProjects', component: ProjectListComponent },
  { path: 'userDescription/:id', component: UserDescriptionComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent },
  { path: 'addTimesheet', component: AddTimesheetComponent},
  { path: 'fileUpload', component: FileUploadComponent},
  { path: 'addMeeting', component: AddMeetingComponent},
  { path: 'meetings', component: MeetingListComponent},
  { path: 'meetings/:id', component: MeetingDetailsComponent },




  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
