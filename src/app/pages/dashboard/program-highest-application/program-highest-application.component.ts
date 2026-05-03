import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InstitutionIntakeService } from 'app/services/institution-intake.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
@Component({
  selector: 'app-program-highest-application',
  templateUrl: './program-highest-application.component.html',
  styleUrls: ['./program-highest-application.component.scss'],
})


export class ProgramHighestApplicationComponent implements OnInit {


  currentUser: Login;
  private onDestroy$: Subject<void> = new Subject<void>();
  programWiseApplicationCount:any =[];

  constructor(private dashboardService: DashboardService,
    private institutionIntakeService: InstitutionIntakeService,
    private authService: AuthenticationService) {
    this.currentUser = this.authService.currentUserSubject.getValue();}

  ngOnInit() {
    this.dashboardService.ProgramWiseApplicationCount()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      const programData = res;
      if (programData && programData.length > 0) {
        this.programWiseApplicationCount = programData;
      }
    });

  }

}
