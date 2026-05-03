import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 currentUser:Login;

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
     this.currentUser=this.authService.currentUserSubject.getValue();
  }
 
}
