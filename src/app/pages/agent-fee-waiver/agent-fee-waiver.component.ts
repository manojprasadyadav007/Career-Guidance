import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatDialog, MatPaginator } from '@angular/material';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AddAgentFeeWaiverComponent } from './add-agent-fee-waiver/add-agent-fee-waiver.component';
import { FeeWaiverService } from 'app/services/fee-waiver.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-agent-fee-waiver',
  templateUrl: './agent-fee-waiver.component.html',
  styleUrls: ['./agent-fee-waiver.component.scss']
})
export class AgentFeeWaiverComponent implements OnInit,OnDestroy {

  // columnToDisplay: string[] = ['Region', 'Agent', 'Institution', 'Program', 'Intake', 'Date', 'NoOfDays', 'NoOfApplication', 'WaiverPer', 'Action'];
  // contactList: MatTableDataSource<any>;

  dataList:any[];
  columns:any[]= [
    { dataField:'CountryName', title:'Region', type:'', format:'' },
     { dataField:'AgentName', title:'Agent', type:'', format:'' },
     { dataField:'InstName', title:'Institution', type:'', format:'' },
     { dataField:'ProgramName', title:'Program', type:'', format:'' },
     { dataField:'IntakeName', title:'Intake', type:'', format:'' },
     { dataField:'UptoDate', title:'Date', type:'date', format:'dd MMM yyyy' },
     { dataField:'NoOfDays', title:'No Of Days ', type:'', format:'' },
     { dataField:'NoOfApplication', title:'No Of Applications', type:'', format:'' },
     { dataField:'WaiverPer', title:'Waiver % ', type:'', format:'' },
    ]
  showFilterRow:boolean=false;

  @ViewChild(MatPaginator, { static:  false }) paginator: MatPaginator;

  gridMessage: string = 'No data';
  permission: number;
  excel_permisson:number = 0;

  private onDestroy$: Subject<void> = new Subject<void>();


  constructor(private feeWaiverService: FeeWaiverService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    authService: AuthenticationService,
    private activityLog: ActivityLogService,) {
    this.permission = authService.checkPermission(sitemap.Fee_Waiver);
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.list();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  list() {
    this.gridMessage = 'Loading';
    this.feeWaiverService.list().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
          this.dataList =res;
          this.gridMessage = 'No data'
      //  this.contactList = new MatTableDataSource(res);
     // this.contactList.paginator = this.paginator;
    });
  }

  delete(WaiverId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.feeWaiverService.delete(WaiverId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop('success','Fee waiver deleted successfully');
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
    this.matDialog.open(AddAgentFeeWaiverComponent,
      { data: { permission: this.permission }, width: '50%', minWidth: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.list();
        }
      });
  }

  edit(WaiverId: number) {
    this.matDialog.open(AddAgentFeeWaiverComponent,
      { data: { WaiverId: WaiverId, permission: this.permission }, width: '50%', minWidth: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.list();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Fee Waivers', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

}
