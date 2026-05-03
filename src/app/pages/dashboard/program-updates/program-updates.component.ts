import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { MatDialog } from '@angular/material';
import { EventAddComponent } from 'app/pages/event/event-add/event-add.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-program-updates',
  templateUrl: './program-updates.component.html',
  styleUrls: ['./program-updates.component.scss']
})
export class ProgramUpdatesComponent implements OnInit, OnDestroy {

  data:any[];
  currentUser:Login;
  readyonly:any =false;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService:DashboardService,
    private matDialog:MatDialog , private authService :  AuthenticationService ) { 
      this.currentUser = this.authService.currentUserSubject.getValue();
    }

  ngOnInit() {
    this.list();
  }

  openEvent(item:any)
  {
    if(this.currentUser.RoleId === 2){
      this.readyonly = true;
    }
    this.matDialog.open(EventAddComponent, { data: { EventId: item.EventId,InstitutionId:item.InstitutionId , readyOnly: this.readyonly}, width: '50%' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.list();
    });
  }

  list()
  {
    this.dashboardService.programUpdates().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.data= res;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
