import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {

  @Input()
  programList: any[];

  filepath: string = environment.filepath + 'institution/';

  parentRoute: string = '';

  @Input()
  isApply: boolean = false;

  @Output()
  onApply: EventEmitter<number> = new EventEmitter<any>();

  currentUser: Login;

  formdata:any;


  constructor(private authService: AuthenticationService) {
    this.currentUser = authService.currentUserSubject.getValue();
  }

  ngOnInit() {
    if (this.authService.currentUserSubject.getValue().UserId > 0) {
      this.parentRoute = 'member/';
    }
  }

  applyFilter()
  {
    
  }

}
