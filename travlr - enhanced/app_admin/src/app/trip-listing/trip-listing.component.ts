import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trips } from '../data/trips';
import { TripCardComponent } from '../trip-card/trip-card.component';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})

export class TripListingComponent implements OnInit{
  trips!: Trip[];
  message: string = '';
  
  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    console.log('Getting trips...');
    this.tripDataService.getTrips()
    .subscribe({
      next: (value: any) => {
        console.log('Received trips:', value);
        this.trips = value;
        if (value.length > 0) {
          this.message = 'There are ' + value.length + ' trips available.';
        } else {
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error getting trips:', error);
      }
    })
  }
  
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  public isLoggedIn()
  {
    const loggedIn = this.authenticationService.isLoggedIn();
    return loggedIn;
  }
}
