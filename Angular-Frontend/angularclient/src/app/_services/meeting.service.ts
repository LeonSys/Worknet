import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../models/project.model";
import {Meeting} from "../models/meeting.model";

const baseUrl = 'http://localhost:8080/api/meetings';


@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(baseUrl);
  }

  get(id: any): Observable<Meeting> {
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

  findByName(name: any): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${baseUrl}?name=${name}`);
  }

}
