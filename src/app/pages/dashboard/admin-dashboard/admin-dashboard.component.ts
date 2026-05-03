import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  currentUser:any;
  constructor(   private authService:  AuthenticationService ) {
    this.currentUser = authService.currentUserSubject.getValue();
   }
 
  ngOnInit() {
    
  }

}
