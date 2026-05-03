import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Login } from 'app/models/login.model';
import { Subject } from 'rxjs/internal/Subject';
import { InvoiceService } from 'app/services/invoice.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MSMAgentService } from 'app/services/msmagent.service';

@Component({
  selector: 'app-map-invoice-commission',
  templateUrl: './map-invoice-commission.component.html',
  styleUrls: ['./map-invoice-commission.component.scss']
})
export class MapInvoiceCommissionComponent implements OnInit, OnDestroy {


  columnToDisplay: string[] = ['Select', 'Date', 'StudentId', 'Name', 'Program',   'FeeDeposit', 'Commission', 'ImportFeeAmount', 'ImportCommissionAmount', 'Remark', 'UserRemark'];
  applicationList: MatTableDataSource<any>;
  institutionList: any[];
  searchdata: any = { Institution: null, AgentId: 0 };
  selection = new SelectionModel<any>(true, []);
  invoiceTotal: number;

  currentUser: Login;

  permission: number = 0;
  instFilter: any = '';

  agentList: any[] = [];
  agentFilter: string = '';


  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private invoiceService: InvoiceService,
    private toasterService: ToasterService,
    authService: AuthenticationService,
    private agentService: MSMAgentService) {
    this.currentUser = authService.currentUserSubject.getValue();
    if (this.currentUser.RoleId === 2) {
      this.searchdata.AgentId = this.currentUser.RefId;
    }
    this.permission = authService.checkPermission(sitemap.InvoiceMapCommission)
  }

  ngOnInit() {
    this.listAgent();
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  listApplication() {
    this.applicationList = undefined;
    this.selection = new SelectionModel<any>(true, []);
    try {
      if (this.searchdata && this.searchdata.AgentId > 0 && this.searchdata.Institution > 0)
        this.invoiceService.mapCommission(this.searchdata)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.applicationList = new MatTableDataSource(res);
          });
    }
    catch (e) {
      console.error(e);
    }

  }

  listAgent() {
    this.agentService.forDDL()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.agentList = res;
      });
  }

  listInstitution() {
    this.institutionList = [];
    this.searchdata.Instituion = null;
    this.applicationList = undefined;
    this.selection = new SelectionModel<any>(true, []);
    if (this.searchdata && this.searchdata.AgentId)
      this.invoiceService.institutionForMapCommission(this.searchdata.AgentId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.institutionList = res;
        });
  }

  isAllSelected() {
    if (this.applicationList) {
      this.invoiceTotal = this.selection.selected.reduce((accum, curr) => accum + (curr["ImportCommission"] ? curr["ImportCommission"] : curr["Commission"]), 0);
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
      this.applicationList.data.forEach(row => this.selection.select(row));
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
      return { DepositId: (value.DepositId ? value.DepositId : null), TransactionId: (value.TransactionId ? value.TransactionId : null) };
    });

    this.invoiceService.approveCommission(deposits).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.toasterService.pop("success", "Commission approved successfully");
      this.listApplication();
    });
  }

  onAgentChange() {
    this.applicationList = undefined;
    this.selection = new SelectionModel<any>(true, []);
    this.listInstitution();
  }

  onInstitutionChange() {
    this.applicationList = undefined;
    this.selection = new SelectionModel<any>(true, []);
  }

  updateCommissionRemark(data: any) {
    this.invoiceService.commissionRemarkUpdate({ DepositId: data.DepositId, TransactionId: data.TransactionId, Remark: data.CommissionRemark }).pipe(takeUntil(this.onDestroy$))
      .subscribe(res => {
        this.toasterService.pop('success', 'Remark updated successfully');
      });
  }

}
