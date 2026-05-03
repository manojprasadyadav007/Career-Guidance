import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { ApplicationService } from 'app/services/application.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { sitemap } from 'app/models/site-map.model';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ApplicationFeeAddComponent } from 'app/pages/application/application-fee/application-fee-add/application-fee-add.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MatDialog } from '@angular/material/dialog';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-student-application',
  templateUrl: './show-student-application.component.html',
  styleUrls: ['./show-student-application.component.scss']
})
export class ShowStudentApplicationComponent implements OnInit  , OnDestroy{

  @Input()
  StudentId:number=0;
  @Input()
  parentName: '';

  @Input()
  showCard:boolean=true;
  gridMessage: string = 'No data';
  permission:number=0;

  dataList:any[];
  columns:any[]= [
    { dataField:'InstName', title:'Institution', type:'', format:'' },
    { dataField:'ProgramName', title:'Program', type:'', format:'' },
    { dataField:'IntekDate', title:'Intake', type:'date', format:'dd MMM yyyy' },
    { dataField:'AddStamp', title:'Application Date', type:'date', format:'dd MMM yyyy' },
  ]
  showFilterRow:boolean=false;
  private onDestroy$: Subject<void> = new Subject<void>();
  // columnToDisplay: string[] = [ 'InstName', 'ProgramName', 'Intake', 'ApplicationDate', 'ApplicationStatus', 'Action'];
  // applicationList: MatTableDataSource<any>;

  currentUser: Login;
  excel_permisson: number = 0;

  constructor(private applicationService: ApplicationService,
    private authService: AuthenticationService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private router: Router,
    private activityLog: ActivityLogService) {
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = this.authService.checkPermission(sitemap.Applications);
    this.listApplication();
  }

  listApplication() {
    this.gridMessage = 'Loading';
    this.applicationService.listByStudent(this.StudentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.dataList =res;
          this.gridMessage = 'No data';
      // this.applicationList = new MatTableDataSource(res);
    });
  }

  deleteApplication(aplicationId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.applicationService.delete(aplicationId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Deleted successfully");
            this.listApplication();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  pay(ApplicationId: number) {

    this.matDialog.open(ApplicationFeeAddComponent,
      { data: { ApplicationId: ApplicationId }, width: '500px' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(
        res => {
          if (res) {
            this.toasterService.pop("success", "Fee saved successfully");
          }
        });
  }

  edit1(aplId : number){
    this.router.navigate(['/member/application/view/'+aplId]);
  }

  addApplication()
  {
     this.router.navigate(['/member/application/apply/0/'+this.StudentId+'/0/0']);
  }

  activitylog(){
    this.activityLog.activitylog(this.StudentId,this.parentName, 'Applications Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
