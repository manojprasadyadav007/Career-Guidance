import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { XlBatchdataDialogComponent } from '../xl-batchdata-dialog/xl-batchdata-dialog.component';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from 'app/services/batch.service';
import { SubTitleService } from 'app/services/sub-title.service';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-extracted-xl-show',
  templateUrl: './extracted-xl-show.component.html',
  styleUrls: ['./extracted-xl-show.component.scss']
})
export class ExtractedXlShowComponent implements OnInit, OnDestroy {
  excel_permisson: number = 0;

  constructor(private matDialog: MatDialog,
    private router: Router,
    private batchService: BatchService,
    authService : AuthenticationService,
    private subTitleService:SubTitleService,
    private activatedRoute:ActivatedRoute,
    private activityLog: ActivityLogService
    ) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    }

  dataList: any[];

  columns: any[] = [
    { dataField: 'BatchId', title: 'Batch ID', type: '', format: '' },
    { dataField: 'InstitutionName', title: 'Institution', type: '', format: '' },
    { dataField: 'TotalRows', title: 'No Of Records', type: 'number', format: '' },
    { dataField: 'AddStamp', title: 'Date', type: 'date', format: 'dd MMM yyyy hh:mm a' },
    { dataField: 'DisplayName', title: 'User', type: '', format: '' },
  ];

  permission: number;
  gridMessage: string = 'No data';
  showFilterRow: boolean = false;

  private onDestroy$: Subject<void> = new Subject<void>();

  batchType:string='';

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(res=>{
      this.batchType = res.get('batch');
      this.subTitleService.name.next(this.batchType);
      this.list();
    });
  }


  list() {
    this.gridMessage = 'Loading';
    this.batchService.list(this.batchType)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList = res;
        this.gridMessage = 'No data';
      });
  }

  add() {
    this.router.navigate(['/member/import-batch/add']);
  }

  open(batch: any) {
    this.matDialog.open(XlBatchdataDialogComponent,
      { data: { id: batch.BatchId, type: batch.BatchType } })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {

        }
      });
  }

  
activitylog(){
  this.activityLog.activitylog(0, 'Import Batch', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
