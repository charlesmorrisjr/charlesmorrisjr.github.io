import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { RoomsComponent } from './rooms/rooms.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'add-trip', component: AddTripComponent },
  { path: 'edit-trip', component: EditTripComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'add-room', component: AddRoomComponent },
  { path: 'edit-room', component: EditRoomComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: TripListingComponent, pathMatch: 'full' }
];
