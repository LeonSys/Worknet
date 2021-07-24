import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { UserListComponent } from 'src/app/user-list/user-list.component';
import { UserFormComponent } from 'src/app/user-form/user-form.component';
import { UserService } from 'src/app/service/user.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {HttpInterceptorService} from "./BasicAuthInterceptor";



@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,

  },UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
