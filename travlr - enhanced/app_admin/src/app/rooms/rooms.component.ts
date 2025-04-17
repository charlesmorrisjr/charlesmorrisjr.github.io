import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Room } from '../models/room';
import { RoomDataService } from '../services/room-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];

  constructor(
    private roomDataService: RoomDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  private loadRooms(): void {
    this.roomDataService.getRooms()
      .subscribe(rooms => {
        this.rooms = rooms;
      });
  }

  public addRoom(): void {
    this.router.navigate(['add-room']);
  }

  public editRoom(room: Room): void {
    localStorage.removeItem('roomCode');
    localStorage.setItem('roomCode', room.code);
    this.router.navigate(['edit-room']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
