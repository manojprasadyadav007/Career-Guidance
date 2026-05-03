import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { InterestAddComponent } from './interest-add/interest-add.component';
import { LeadInterestService } from 'app/services/lead-interest.service';
import { ToasterService } from 'angular2-toaster';
import { environment } from 'environments/environment';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';


@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit, OnDestroy {

  // columnToDisplay: string[] = ['Institution', 'Program', 'Action'];
  // dataList: MatTableDataSource<any>;
  gridMessage: string = 'No data';

  dataList:any[];

  columns:any[]=[
    { dataField:'InstName', title:'Institution', type:'', format:'' },
    { dataField:'Program', title:'Program', type:'', format:'' }
  ];

    showFilterRow:boolean=false;
  @Input()
  LeadId: number = 0;
  @Input()
  permission: number = 0;

   @Input()
   parentName: '';

  @Input()
  showCard:boolean=true;

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private leadInterestService: LeadInterestService,
    authService : AuthenticationService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
    this.list();
  }

  list() {
    if (this.LeadId > 0) {
      this.gridMessage = 'Loading';
      this.leadInterestService.list(this.LeadId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.dataList = res;
        this.gridMessage = 'No data';
        // this.dataList.paginator = this.paginator;
      });
    }
  }

  delete(interestId: number) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.leadInterestService.delete(interestId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Interest deleted successfully");
            this.list();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  add() {
    this.matDialog.open(InterestAddComponent,
      { data: { LeadId: this.LeadId },width:'80%' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Interest Saved successfully");
          this.list();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.LeadId, this.parentName, 'Interest Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
