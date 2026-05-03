import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MiscService} from 'app/services/misc.service';
import { ToasterService } from 'angular2-toaster';
import { of } from 'rxjs';
import { BatchService } from 'app/services/batch.service';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-xl-batchdata-dialog',
  templateUrl: './xl-batchdata-dialog.component.html',
  styleUrls: ['./xl-batchdata-dialog.component.scss']
})
export class XlBatchdataDialogComponent implements OnInit {

  private onDestroy$: Subject<void> = new Subject<void>();
  dataList:any[];
  columns:any[]= [
    { dataField: 'StudentId', title: 'Student ID', type: '', format: '' },
    { dataField: 'FirstName', title: 'First Name', type: '', format: '' },
    { dataField: 'MiddleName', title: 'Middle Name', type: '', format: '' },
    { dataField: 'LastName', title: 'Last Name', type: '', format: '' },
    { dataField: 'Program', title: 'Program', type: '', format: '' },
    { dataField: 'Intake', title: 'Intake', type: '', format: '' },
    { dataField: 'AgentName', title: 'Agent', type: '', format: '' },
    { dataField: 'FeeAmount', title: 'Fee', type: '', format: '' },
    { dataField: 'CommissionAmount', title: 'Commission', type: '', format: '' },
  ];
  batchId:number;
  gridMessage: string = 'No data';
  showFilterRow:boolean=false;
  excel_permisson: number = 0;
  constructor(
    private dialogRef: MatDialogRef<XlBatchdataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data, private misc: MiscService,
    private batchService:BatchService,
    authService : AuthenticationService,
    private activityLog: ActivityLogService
  ) {
    this.batchId = data.id;
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }
  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.gridMessage = 'Loading';
    this.batchService.getData(this.batchId)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  activitylog(){
    this.activityLog.activitylog(this.batchId, 'Import Batch', 'Batch Data Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

  close(batchId:number)
  {

  }

}
