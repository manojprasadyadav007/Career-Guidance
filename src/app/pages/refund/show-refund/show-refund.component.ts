import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { RefundService } from 'app/services/refund.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MatDialog } from '@angular/material';
import { ViewRefundDocumentsComponent } from '../view-refund-documents/view-refund-documents.component';
import { ToasterService } from 'angular2-toaster';
import { InputBoxDialogComponent } from 'app/utility/input-box-dialog/input-box-dialog.component';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-refund',
  templateUrl: './show-refund.component.html',
  styleUrls: ['./show-refund.component.scss']
})
export class ShowRefundComponent implements OnInit {


  showFilterRow: any = false;
  currentUser: Login;
  permission: any;
  can_add: boolean = false;
  keyword: any = '';
  keyworderror: boolean = false;
  intake: string = null;
  status: string = null;
  ddl_val = "Recently Modified";
  dataList: any = [];
  EventType: any = 'Recently Modified';
  can_delete: boolean = false;
  excel_permisson: number = 0;
  gridMessage='No Data';
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthenticationService,
    private activityLog: ActivityLogService,
    private refundService: RefundService,
    private matDialog: MatDialog,
    private toasterService: ToasterService) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = this.authService.checkPermission(sitemap.refund);
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
  }


  columns: any[] = [];

  ngOnInit() {
    this.list();
    if (this.currentUser.RoleType === 2) {
      this.columns = [
        { title: "First Name", data: "FirstName", type: "", format: "" },
        { title: "Middle Name", data: "MiddleName", type: "", format: "" },
        { title: "Last Name", data: "LastName", type: "", format: "" },
        { title: "Intake", data: "IntakeName", type: "", format: "" },
        { title: "Program", data: "ProgramName", type: "", format: "" },
        { title: "Initiate Date", data: "InitiateDate", type: "date", format: 'dd MMM yyyy' },
        { title: "Status", data: "RefundStatus", type: "", format: "" },
        { title: "Status Date", data: "RefundStatusDate", type: "date", format: 'dd MMM yyyy' },
        { title: "Remarks", data: "RefundRemarks", type: "", format: "" }

      ];
    } else {
      this.columns = [
        { title: "First Name", data: "FirstName", type: "", format: "" },
        { title: "Middle Name", data: "MiddleName", type: "", format: "" },
        { title: "Last Name", data: "LastName", type: "", format: "" },
        { title: "Intake", data: "IntakeName", type: "", format: "" },
        { title: "Program", data: "ProgramName", type: "", format: "" },
        { title: "Institution", data: "InstName", type: "", format: "" },
        { title: "Initiate Date", data: "InitiateDate", type: "date", format: 'dd MMM yyyy' },
        { title: "Status", data: "status", type: "", format: "" },
        { title: "Status Date", data: "RefundStatusDate", type: "date", format: 'dd MMM yyyy' },
        { title: "Remarks", data: "RefundRemarks", type: "", format: "" }
      ]
    }
  }

  list() {
    this.gridMessage='Loading...';
    let data = { keyword: this.ddl_val }
    this.refundService.list(data).pipe(takeUntil(this.onDestroy$)).subscribe(item => {
      this.dataList = item;
      this.gridMessage='No Data';
    });
  }
  add() {

  }
  onDelete() {

  }
  onBlurMethod() {

  }

  changeOption(evt){
    this.ddl_val =evt;
    this.list();
    if(this.keyworderror)
    {
      this.keyworderror = false;
    }
  }
  searchByKeyword() {
    this.ddl_val = this.keyword;
    //    if (this.keyword==true) {this.keyworderror=!this.keyworderror;}
    if (this.keyword == undefined || this.keyword == '') {
      this.keyworderror = true;
      // this.list("");
    } else {
      this.keyworderror = false;
      this.list();
    }
  }

  searchByEnter(){
    this.ddl_val = this.keyword;
    if (this.keyword == undefined || this.keyword == '') {
      this.keyworderror = true;
    } else {
      this.keyworderror = false;
      this.list();
    }
  }

  viewDocuments(applicationId) {

    this.matDialog.open(ViewRefundDocumentsComponent, {
      data: {
        parentId: applicationId,
        parentType: 16,
        permission: this.permission, showRemark: false, addButtonRestrict: true
      }
    }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.list();
      });
  }


  refundStatus(applicationId: any, status: number) {

    let title = 'Rejection Remarks';
    if (status === 1) {
      title = 'Approved Remarks'
    }

    this.matDialog.open(InputBoxDialogComponent, { data: { title: title, valueName: 'Remark', required: true }, width: '80%' }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res !== false) {
          const payload = { 'ApplicationId': applicationId, 'Status': status, 'Remarks': res };
          this.refundService.refundStatus(payload).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.toasterService.pop("success", "Saved successfully");
            this.list();
          });
        }
      });
  }



  onCellPrepared(e) {
    try {
      if (e.column.caption == "Status") {
        if (e.data.RefundStatus === 0) {
          e.cellElement.innerHTML = '<span> ' + "Rejected" + '</span>';
        } 
        if (e.data.RefundStatus === 1) {
          e.cellElement.innerHTML = '<span> ' + "Approved" + '</span>';
        }
      }
    }
    catch (e) {
    }
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Refund', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'advanceButtonTemp'
    });
  }
}
