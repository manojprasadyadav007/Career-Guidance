import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvoiceService } from 'app/services/invoice.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { SubTitleService } from 'app/services/sub-title.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivatedRoute } from '@angular/router';
import { sitemap } from 'app/models/site-map.model';
import { MatDialog } from '@angular/material/dialog';
import { DisplayQueriesAttachmentsComponent } from '../display-queries-attachments/display-queries-attachments.component';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-display-invoice',
  templateUrl: './display-invoice.component.html',
  styleUrls: ['./display-invoice.component.scss']
})
export class DisplayInvoiceComponent implements OnInit, OnDestroy {

  dataList: any[];
  gridMessage: string = 'No data';
  columns: any[] = [
    {
      dataField: 'DepositDate',
      title: 'Deposit Date',
      type: 'date',
      format: 'dd MMM yyyy'
    },
    {
      dataField: 'EnrollmentNo',
      title: 'Student ID',
      type: '',
      format: ''
    },
    {
      dataField: 'StudentName',
      title: 'Student Name',
      type: '',
      format: ''
    },
    {
      dataField: 'ProgramName',
      title: 'Program',
      type: '',
      format: ''
    },
    {
      dataField: 'Fee',
      title: 'Fee Amount',
      type: 'number',
      format: '#.##'
    },
    {
      dataField: 'Commission',
      title: 'Commission Amount',
      type: 'number',
      format: '#.##'
    },
    { dataField: 'QueryAndAttachment', title: 'Queries & Attachments', type: 'number' },
  ];
  showFilterRow: boolean = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  invoiceId: number;
  permission: number = 0;
  excel_permisson: number = 0;

  constructor(
    private invoiceService: InvoiceService,
    authService: AuthenticationService,
    private subTitleService: SubTitleService,
    private activatedRoute: ActivatedRoute,
    private activityLog: ActivityLogService,
    private matDialog: MatDialog
  ) {
    this.permission = authService.checkPermission(sitemap.InvoiceView);
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.invoiceId = +res.get('id') | 0;
      this.list();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  list() {
    this.gridMessage = 'Loading';
    this.invoiceService.get(this.invoiceId)
      .pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        res.Transactions.forEach(element => {
          element.QueryAndAttachment = (element.QueryCount + element.DocumentCount);
        });
        this.dataList = res.Transactions;
        this.gridMessage = 'No data';
        this.subTitleService.name.next(res.InvoiceNo);
      });
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  openQueries(item: any) {
    this.matDialog.open(DisplayQueriesAttachmentsComponent, { data: { transactionId: item.TransactionId, permission: this.permission } })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.getQueryCount(item);
      });
  }

  getQueryCount(item: any) {
    this.invoiceService.queryCount(item.TransactionId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        item.QueryCount = res.QueryCount;
        item.DocumentCount = res.DocumentCount;
        item.QueryAndAttachment = (res.QueryCount + res.DocumentCount)
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.invoiceId,'Invoices', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }


}
