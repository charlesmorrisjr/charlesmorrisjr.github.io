import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { User } from '../user';
import { AuthResponse } from '../auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  baseUrl = 'http://localhost:3000/api';
  url = 'http://localhost:3000/api/rooms';

  getRooms(): Observable<Room[]> {    
    return this.http.get<Room[]>(this.url);
  }

  getRoom(roomCode: string): Observable<Room> {
    return this.http.get<Room>(this.url + '/' + roomCode);
  }

  addRoom(formData: Room): Observable<Room> {
    return this.http.post<Room>(this.url, formData);
  }

  updateRoom(formData: Room): Observable<Room> {
    return this.http.put<Room>(this.url + '/' + formData.code, formData);
  }

  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
} 