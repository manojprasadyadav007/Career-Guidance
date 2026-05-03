import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { AddInstitutionDocumentComponent } from './add-institution-document/add-institution-document.component';
import { InstitutionDocumentService } from 'app/services/institution-document.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ActivityLogService } from 'app/services/activity-log.service';


@Component({
  selector: 'app-institution-document',
  templateUrl: './institution-document.component.html',
  styleUrls: ['./institution-document.component.scss']
})
export class InstitutionDocumentComponent implements OnInit, OnDestroy {

  @Input()
  InstitutionId: number;

  @Input()
  parentName: '';

  dataList: any[];
  columns: any[] = [
    {
      dataField: 'CountryName',
      title: 'Region',
      type: '',
      format: ''
    },
    {
      dataField: 'DocumentName',
      title: 'Name',
      type: '',
      format: ''
    },

  ];

  currentUser: Login;
  gridMessage: string = 'No data';
  permission: number = 0;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  showFilterRow: boolean = false;
  constructor(private authService: AuthenticationService,
    private documentService: InstitutionDocumentService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,
    ) {
    this.currentUser = this.authService.currentUserSubject.getValue();

  }

  ngOnInit() {
    if (this.currentUser.RoleType === 2) {
      this.InstitutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Document);
    }
    else {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    this.list();
  }



  add(InstituteDocumentId?: number) {
    this.matDialog.open(AddInstitutionDocumentComponent, {
      data: {
        InstituteDocumentId: InstituteDocumentId, InstitutionId: this.InstitutionId, permission: this.permission
      }
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.list();
      }
    });
  }



  list() {
    this.gridMessage = 'Loading';
    this.documentService.list(this.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  delete(documentid: number) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.documentService.delete(documentid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop('success', 'Document deleted successfully.');
            this.list();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  activitylog(){
    this.activityLog.activitylog(this.InstitutionId, this.parentName, 'Document Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
