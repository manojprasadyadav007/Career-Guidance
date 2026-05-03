import { Component, OnInit } from '@angular/core';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  currentUser: Login;
  constructor(private authService: AuthenticationService) {
    this.currentUser = this.authService.currentUserSubject.getValue();

  }

  ngOnInit() {
  }

}
