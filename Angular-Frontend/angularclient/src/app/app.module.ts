import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { UserDescriptionComponent } from './components/user-description/user-description.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AddTimesheetComponent } from './components/add-timesheet/add-timesheet.component';
import { TimesheetListComponent } from './components/timesheet-list/timesheet-list.component';
import {Timesheet} from "./models/timesheet.model";
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { InspectTaskComponent } from './components/inspect-task/inspect-task.component';
import { MeetingListComponent } from './components/meeting-list/meeting-list.component';
import { MeetingDetailsComponent } from './components/meeting-details/meeting-details.component';
import { AddMeetingComponent } from './components/add-meeting/add-meeting.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    AddTaskComponent,
    TaskDetailsComponent,
    TasksListComponent,
    UserListComponent,
    AddProjectComponent,
    ProjectListComponent,
    UserDescriptionComponent,
    ProjectDetailsComponent,
    AddTimesheetComponent,
    TimesheetListComponent,
    FileUploadComponent,
    InspectTaskComponent,
    MeetingListComponent,
    MeetingDetailsComponent,
    AddMeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
