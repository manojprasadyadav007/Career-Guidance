import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { InstitutionDesciplineService } from 'app/services/institution-descipline.service';
import { AddDesciplinesComponent } from '../add-desciplines/add-desciplines.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';
import { sitemap  } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-show-desciplines',
  templateUrl: './show-desciplines.component.html',
  styleUrls: ['./show-desciplines.component.scss']
})
export class ShowDesciplinesComponent implements OnInit , OnDestroy {


  //columnToDisplay: string[] = ['Name', 'Weightage', 'Action'];
  // columnToDisplay: string[] = ['Name'];
  // contactList: MatTableDataSource<any>;

  @Input()
  institutionId: number = 0;

  @Input()
  permission:number;

  @Input()
  parentName: '';

  dataList:any[];

  columns:any[]=[
    {
      dataField:'DesciplineName',
      title:'Discipline',
      type:'',
      format:''
    }];

    currentUser:Login;
    gridMessage: string = 'No data';
    showFilterRow:boolean=false;
    private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private instDescService: InstitutionDesciplineService,
    private authService:AuthenticationService,
    private matDialog: MatDialog,
    private activityLog: ActivityLogService,) {
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {
    if(this.currentUser.RoleType === 2) {
      this.institutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Disciplines);
    }
    if (this.institutionId > 0) {
      this.listDescipline();
    }
  }

  listDescipline() {
    this.gridMessage = 'Loading';
    this.instDescService.list(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dataList = res;
      this.gridMessage = 'No data';
      //this.contactList = new MatTableDataSource(res);
    });
  }

  deleteDescipline(instDescId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.instDescService.delete(instDescId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.listDescipline();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  addDesciplines() {
    this.matDialog.open(AddDesciplinesComponent,
      { data: { institutionId: this.institutionId },width: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.listDescipline();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.institutionId, this.parentName, 'Disciplines Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
