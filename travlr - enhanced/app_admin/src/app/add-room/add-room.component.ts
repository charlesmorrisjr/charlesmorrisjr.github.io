import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { RoomDataService } from '../services/room-data.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent implements OnInit {
  addForm!: FormGroup;
  submitted = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomService: RoomDataService
  ) {}

  ngOnInit(): void {
    // Initialize the form with empty values
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      perDay: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.roomService.addRoom(this.addForm.value)
        .subscribe({
          next: (room) => {
            this.router.navigate(['/rooms']);
          },
          error: (err) => {
            this.error = "Error adding room";
          }
        });
    }
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

  // public method to handle cancel navigation
  public onCancel(): void {
    this.router.navigate(['rooms']);
  }
}
