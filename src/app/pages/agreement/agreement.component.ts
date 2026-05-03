import { Component, OnInit, Input, ViewChild, OnDestroy, SimpleChanges } from '@angular/core';
import { MatPaginator, MatDialog } from '@angular/material';
import { AgreementService } from 'app/services/agreement.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AddAgreementComponent } from './add-agreement/add-agreement.component';
import { environment } from 'environments/environment';
import { DocumentProcessService } from 'app/services/document-process.service';
import { ShowNotificationComponent } from './show-notification/show-notification.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit, OnDestroy {

  // columnToDisplay: string[] = ['Start','End','Description','Status','LastActivity', 'Action'];
  // contactList: MatTableDataSource<any>;

  dataList: any[];
  columns: any[] = [];
  showFilterRow: boolean = false;
  gridMessage: string = 'No data';
  @Input()
  parentId: number;

  @Input()
  parentType: number = -1;

  @Input()
  parentName: '';

  @Input()
  permission: number;
  @Input() agreementInfo:string;
  private onDestroy$: Subject<void> = new Subject<void>();
  filepath: string = environment.filepath + "Agreement/";

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  currentUser: Login;
  excel_permisson: number = 0;


  constructor(private agreementService: AgreementService,
    private matDialog: MatDialog, private documentService: DocumentProcessService,
    authService: AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService
  ) {
    this.currentUser = authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.columns = [
      { dataField: 'StartDate', title: 'Start', type: 'date', format: 'dd MMM yyyy' },
      { dataField: 'EndDate', title: 'End', type: 'date', format: 'dd MMM yyyy' },
      { dataField: 'Institution', title: 'Institution', type: '', format: '' },
      { dataField: 'RequestStatus', title: 'Status', type: '', format: '' },
    ];   
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.agreementInfo !='') this.list(); 
  }
  
  list() {
    this.gridMessage = 'Loading';
    this.agreementService.list(this.parentId, this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  delete(AgreementId: number, requestid: string) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.agreementService.delete(AgreementId, requestid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success","Agreement deleted successfully");
          this.list();
        });
      }
    });
  }

  add() {
    this.matDialog.open(AddAgreementComponent,
      { data: { ParentId: this.parentId, ParentType: this.parentType, permission: this.permission }, width: '50%', minWidth: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.list();
        }
      });
  }

  edit(AgreementId: number) {
    this.matDialog.open(AddAgreementComponent,
      { data: { AgreementId: AgreementId, ParentId: this.parentId, ParentType: this.parentType, permission: this.permission }, width: '50%', minWidth: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.list();
        }
      });
  }

  onActionShow(event) {
      window.open(this.filepath + event.AgreementPath, "_blank");
  }


  onSubmit(requestid: string) {
    this.documentService.submit(requestid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.list();
    });
  }

  openNotification(requestid: string) {
    this.matDialog.open(ShowNotificationComponent, { data: { requestid: requestid }, minWidth: '350px', width: '70%' });
  }

  activitylog(){
    this.activityLog.activitylog(this.parentId, this.parentName, 'Agreement Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
