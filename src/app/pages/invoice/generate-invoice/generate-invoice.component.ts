import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from 'app/services/invoice.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DisplayQueriesAttachmentsComponent } from '../display-queries-attachments/display-queries-attachments.component';

@Component({
  selector: 'app-generate-invoice',
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit, OnDestroy {

  columnToDisplay: string[] = ['Select', 'Date', 'StudentId', 'Name', 'Program', 'FeeDeposit', 'Commission', 'Action'];
  applicationList: MatTableDataSource<any>;
  institutionList: any[];
  searchdata: any = { Institution: 0, AgentId: 0 };
  selection = new SelectionModel<any>(true, []);
  invoiceTotal: number;

  currentUser: Login;

  permission: number = 0;
  instFilter: any = '';
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private invoiceService: InvoiceService,
    private toasterService: ToasterService,
    private authService: AuthenticationService,
    private matDialog: MatDialog) {
    this.currentUser = authService.currentUserSubject.getValue();
    if (this.currentUser.RoleId === 2) {
      this.searchdata.AgentId = this.currentUser.RefId;
    }
    //this.permission = authService.checkPermission(sitemap.InvoiceGenerate)
    this.permission = this.currentUser.RoleId === 2 && this.currentUser.isPrimary === 1 ? 3 : 0;
  }

  ngOnInit() {
    this.listInstitution();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  listApplication() {
    this.applicationList = undefined;
    this.selection = new SelectionModel<any>(true, []);
    this.invoiceService.pendingApplication(this.searchdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.applicationList = new MatTableDataSource(res);
    });
  }

  listInstitution() {
    this.invoiceService.institutionForPendingInvoice(this.searchdata.AgentId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.institutionList = res;
      });
  }

  isAllSelected() {
    if (this.applicationList) {
      let total = this.selection.selected.reduce((accum, curr) => accum + curr["Commission"], 0);

      this.invoiceTotal = total;

      const numSelected = this.selection.selected.length;
      const numRows = this.applicationList.data.length;
      return numSelected === numRows;
    }
    else {
      this.invoiceTotal = 0;
      return 0;
    }

  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.applicationList.data.forEach(row => { this.selection.select(row) });
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  doTotal(columnname: string) {
    if (this.applicationList) {
      return this.applicationList.data.reduce((accum, curr) => accum + curr[columnname], 0);
    }
  }

  generateInvoice() {
    var deposits = this.selection.selected.map((value) => {
      return value.TransactionId;
    });

    this.invoiceService.add(deposits).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.toasterService.pop("success", "Invoice generated successfully");
      this.listApplication();
    });
  }


  openQueries(item: any) {
    this.matDialog.open(DisplayQueriesAttachmentsComponent, { data: { transactionId: item.TransactionId, permission: this.permission } })
    .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.getQueryCount(item);
    });
  }

  getQueryCount(item:any)
  {
    this.invoiceService.queryCount(item.TransactionId)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
       item.QueryCount=res.QueryCount;
       item.DocumentCount=res.DocumentCount;
    });
  }

}
