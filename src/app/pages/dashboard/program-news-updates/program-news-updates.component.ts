import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { MatDialog } from '@angular/material';
import { EventAddComponent } from 'app/pages/event/event-add/event-add.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
@Component({
  selector: 'app-program-news-updates',
  templateUrl: './program-news-updates.component.html',
  styleUrls: ['./program-news-updates.component.scss']
})
export class ProgramNewsUpdatesComponent implements OnInit,OnChanges, OnDestroy {
  currentUser:any;
  readyonly:any =false;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService:DashboardService,
                private matDialog :MatDialog ,private authService :  AuthenticationService ) { 
                  this.currentUser = this.authService.currentUserSubject.getValue();
                 }
data : any = [];
orginalData:any =[];
searchData:any;
pageIndex:number=1;

  ngOnInit() {
    this.list("");
  }

  openEvent(item:any)
  {
      if(this.currentUser.RoleId === 2){
      this.readyonly = true;
    }
    this.matDialog.open(EventAddComponent, { data: { EventId: item.EventId,InstitutionId:item.InstitutionId , readyOnly: this.readyonly}, width: '50%' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.list("");
      this.searchData ='';
    });
  }

  list(keyword)
  {
    // this.dashboardService.programUpdates().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
    //   this.data= this.orginalData = res.map(x => Object.assign({}, x));
    // });
    this.dashboardService.ProgramUpdatesForSearch(keyword).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
         this.data= this.orginalData = res.map(x => Object.assign({}, x));
       });
  }
  filterParam1(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.data = this.orginalData.filter(item => {    return item.ProgramName.toLowerCase().indexOf(filterValue) === 0});
    }
    else{
    this.data= this.orginalData ;
  }
  }
  ngOnChanges()
  {
    if(this.data)
    {
      this.pageIndex=1;
      this.data.forEach(value=>{
        value.p=1;
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
