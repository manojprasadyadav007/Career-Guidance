import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';
import { Login } from 'app/models/login.model';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { InstitutionPartnerPerService } from 'app/services/institution-partner-per.service';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-group-visibility',
  templateUrl: './group-visibility.component.html',
  styleUrls: ['./group-visibility.component.scss']
})
export class GroupVisibilityComponent implements OnInit, OnDestroy {


  @Input()
  InstitutionId = 0;

  @Input()
  parentName: '';

  dataList: any[];

  columns: any[] = [
    {
      dataField: 'PartnerTypeName',
      title: 'Partner Type',
      type: '',
      format: ''
    }
  ];
  showFilterRow = false;
  currentUser: Login;
  gridMessage: string = 'No data';

  permission;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private institutionPartnerService: InstitutionPartnerPerService,
    private router: Router,
    private authService: AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    if (this.currentUser.RoleType === 2) {
      this.InstitutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Group_Visibility);
    } else {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }

    this.list();
  }



  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  list() {
    this.gridMessage = 'Loading';
    this.institutionPartnerService.groupVisibilityList(this.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  onStatusChange(event: any, data: any) {

    const status = event.checked;
    this.institutionPartnerService.statusUpdate(data.PartnerTypeId, status, this.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.toasterService.pop('success', 'Status updated successfully');
      this.list();
    });
  }

  activitylog(){
    this.activityLog.activitylog(this.InstitutionId, this.parentName, 'Group Visibility Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
