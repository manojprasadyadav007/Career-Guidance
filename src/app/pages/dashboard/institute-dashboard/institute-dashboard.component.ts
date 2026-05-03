import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-institute-dashboard',
  templateUrl: './institute-dashboard.component.html',
  styleUrls: ['./institute-dashboard.component.scss']
})
export class InstituteDashboardComponent implements OnInit {

  currentUser: any;
  constructor(private authService: AuthenticationService) {
    this.currentUser = authService.currentUserSubject.getValue();
  }

  ngOnInit() {

  }

}
