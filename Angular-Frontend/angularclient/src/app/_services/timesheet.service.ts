import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Timesheet} from "../models/timesheet.model";

const baseUrl = 'http://localhost:8080/api/timesheets';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(baseUrl);
  }

  get(id: any): Observable<Timesheet> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}
  // findByName(name: any): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${baseUrl}`);
  // }

  /*findByName(name: any): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${baseUrl}?name=${name}`);
  }*/


