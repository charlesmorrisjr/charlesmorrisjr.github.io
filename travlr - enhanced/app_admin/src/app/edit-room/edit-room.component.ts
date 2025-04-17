import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { RoomDataService } from '../services/room-data.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomService: RoomDataService
  ) {}

  ngOnInit(): void {
    // Retrieve stashed roomCode
    let roomCode = localStorage.getItem("roomCode");
    if (!roomCode) {
      this.error = "Something wrong, couldn't find where I stashed roomCode!";
      this.router.navigate(['']);
      return;
    }

    // Initialize the form
    this.editForm = this.formBuilder.group({
      code: [roomCode, Validators.required],
      name: ['', Validators.required],
      perDay: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Load the room data
    this.roomService.getRoom(roomCode)
      .subscribe({
        next: (room) => {
          this.editForm.patchValue(room);
        },
        error: (err) => {
          this.error = "Room not found!";
          this.router.navigate(['']);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.roomService.updateRoom(this.editForm.value)
        .subscribe({
          next: (room) => {
            this.router.navigate(['/rooms']);
          },
          error: (err) => {
            this.error = "Error updating room";
          }
        });
    }
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  // public method to handle cancel navigation
  public onCancel(): void {
    this.router.navigate(['rooms']);
  }
}
