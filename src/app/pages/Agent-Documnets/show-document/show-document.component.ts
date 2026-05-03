import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';
import { AgentDocumentService } from 'app/services/agent-document.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddDocumentComponent } from '../add-document/add-document.component';

@Component({
  selector: 'app-show-document',
  templateUrl: './show-document.component.html',
  styleUrls: ['./show-document.component.scss']
})
export class ShowDocumentComponent implements OnInit,OnDestroy {

 

  dataList: any[];
  columns: any[] = [
    {
      dataField: 'CountryName',
      title: 'Region',
      type: '',
      format: ''
    },
    {
      dataField: 'ProvinceName',
      title: 'Province',
      type: '',
      format: ''
    },
    {
      dataField: 'DocumentName',
      title: 'Document',
      type: '',
      format: ''
    },

  ];

  currentUser: Login;
  gridMessage: string = 'No data';
  permission: number = 0;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  showFilterRow:boolean=false;
  constructor(private authService: AuthenticationService,
    private documentService: AgentDocumentService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,) { 
    this.currentUser = this.authService.currentUserSubject.getValue();

  }

  ngOnInit() {
      this.permission = this.authService.checkPermission(sitemap.Agent_Document);
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
    
    this.list();
  }

 

  add(DocumentCountryId?: number) {
    this.matDialog.open(AddDocumentComponent, {
      data: {
        DocumentCountyId: DocumentCountryId,permission:this.permission
      } 
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.list();
      }
    });
  } 
  list() {
    this.gridMessage = 'Loading';
    this.documentService.list().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
      this.gridMessage = 'No data'
    });
  }

  delete(DocumentCountryId: number) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.documentService.delete(DocumentCountryId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success","Document deleted successfully");
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
    this.activityLog.activitylog(0, 'Agent Document', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
