import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { InstituteService } from 'app/services/institute.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { environment } from 'environments/environment';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-institution-agents',
  templateUrl: './institution-agents.component.html',
  styleUrls: ['./institution-agents.component.scss']
})
export class InstitutionAgentsComponent implements OnInit, OnDestroy {

  @Input()
  InstitutionId: number = 0;

  @Input()
  parentName: '';

  @Input()
  instituteAgentInfo:'';

  dataList: any[];

  columns: any[] = [
    {
      dataField: 'CompanyName',
      title: 'Name',
      type: '',
      format: ''
    },
    {
      dataField: 'Email',
      title: 'Email ID',
      type: '',
      format: ''
    },
    {
      dataField: 'PhoneNo',
      title: 'Contact Number',
      type: '',
      format: ''
    },
    {
      dataField: 'AgreementStatus',
      title: 'Agreement Status',
      type: '',
      format: ''
    },
    {
      dataField: 'AEFStatus',
      title: 'AEF Status',
      type: '',
      format: ''
    },
    { title: 'City', dataField: 'City', type: '' },
    { title: 'Province', dataField: 'Province', type: '' },
    { title: 'Country', dataField: 'Country', type: '' },
  ];
  gridMessage: string = 'No data';
  showFilterRow: boolean = false;
  currentUser: Login;

  permission;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private institutionService: InstituteService,
    private router: Router,
    private authService: AuthenticationService,
    private activityLog: ActivityLogService) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    if (this.currentUser.RoleType === 2) {
      this.InstitutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Institute_Agents);
    }
    else {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }

    this.list();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  list() {
    this.gridMessage = 'Loading';
    this.institutionService.agents(this.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
      this.gridMessage = 'No data';
    });
  }

  openAEF(applicationId: number) {
    this.router.navigate(['/member/evaluationform/application-for-institution/edit-application/' + applicationId], { queryParams: { returnUrl: this.router.url } });
  }

  onCellPrepared(e) {
    try {
      if (e.column.caption.toLowerCase() == "aef status") {
        if (e.data.ApplicationId) {
        e.cellElement.innerHTML = '<span style="font-size: 14px;" class="text-info d-block" >' + e.data.AEFStatus + ' </span>';
        }
      }
      else if (e.column.caption.toLowerCase() == "agreement status") {
        if (e.data.AgreementPath) {
          e.cellElement.innerHTML = '<span style="font-size: 14px;" class="text-info d-block" ><a href="'+environment.filepath+'Agreement/'+e.data.AgreementPath +'" target="_blank">' + e.data.AgreementStatus + ' </a></span>';
        }
      }
    }
    catch (e) {

    }
  }

  onCellClick(e) {
    try {
      if (e.column.caption.toLowerCase() == "aef status") {
        if(+e.data.ApplicationId>0)
        {
          this.openAEF(e.data.ApplicationId);
        }
      }

    } catch (ew) {

    }
  }

  activitylog(){
    this.activityLog.activitylog(this.InstitutionId, this.parentName, 'Agent Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.instituteAgentInfo !='') this.list(); 
  }
  

}
