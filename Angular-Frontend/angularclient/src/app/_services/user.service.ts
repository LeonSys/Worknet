import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Task} from "../models/task.model";
import {User} from "../models/user.model";

const API_URL = 'http://localhost:8080/api/test/';
const API_LIST_URL = 'http://localhost:8080/api/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }


  getAll(): Observable<User[]> {
    return this.http.get<User[]>(API_LIST_URL);
  }

  get(id: any): Observable<User> {
    return this.http.get(`${API_LIST_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(API_LIST_URL, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_LIST_URL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_LIST_URL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(API_LIST_URL);
  }

  // findByName(name: any): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${baseUrl}`);
  // }
  findByName(name: any): Observable<User[]> {
    return this.http.get<User[]>(`${API_LIST_URL}?name=${name}`);
  }




}
