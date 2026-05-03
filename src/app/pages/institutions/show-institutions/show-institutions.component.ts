import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InstituteService } from 'app/services/institute.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Login } from 'app/models/login.model';
import { sitemap, enumToName, AgentEvolutionFormStatus } from 'app/models/site-map.model';
import { Location } from '@angular/common';
import { ShowInstitutionMaterialDialogComponent } from '../instituteion-material/show-institution-material-dialog/show-institution-material-dialog.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DxTooltipComponent } from 'devextreme-angular';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-show-institutions',
  templateUrl: './show-institutions.component.html',
  styleUrls: ['./show-institutions.component.scss']
})
export class ShowInstitutionsComponent implements OnInit, OnDestroy {
  @ViewChild(DxTooltipComponent, { static: false }) tooltip: DxTooltipComponent;
  dataList: any[];
  columns: any[] = [
    {
      dataField: 'InstName',
      title: 'Name',
      type: '',
      format: ''
    },
    {
      dataField: 'InstAddress',
      title: 'Address',
      type: '',
      format: ''
    },
    {
      dataField: 'CityName',
      title: 'City',
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
      dataField: 'CountryName',
      title: 'Country',
      type: '',
      format: ''
    },
    {
      dataField: 'Region',
      title: 'Region',
      type: '',
      format: ''
    },
    {
      dataField: 'NoOfProgram',
      title: 'Total Program',
      type: 'number',
      format: ''
    },
    {
      dataField: 'NoOfOpenProgram',
      title: 'Open Program',
      type: 'number',
      format: ''
    },
    {
      dataField: 'AgentAuthStatus',
      title: 'Status',
      type: '',
      format: '',
    },
    {
      dataField: 'RegionOfMarketing',
      title: 'Region Of Marketing',
      type: '',
      format: '',
      groupIndex: 0
    },
    {
      dataField: 'PartnerTypeName',
      title: 'Partner Type',
      type: '',
      format: '',
      groupIndex: 1
    },
    {
      title: 'Add Stamp',
      dataField: 'AddStamp',
      type: 'date',
      format: 'dd MMM yyyy'
    }

  ];
  private onDestroy$: Subject<void> = new Subject<void>();
  currentUser: Login;
  parentRoute: string = "";
  permission: number = 0;

  formdata: any = { keyword: '' };

  can_add: boolean = false;
  can_update: boolean = false;
  can_delete: boolean = false;
  ToolTipText: any = '';
  getName = enumToName;
  agentEvolutionFormStatusList = AgentEvolutionFormStatus;
  gridMessage: string = 'No data';
  showFilterRow: boolean = false;
  excel_permisson: number = 0;

  constructor(private instService: InstituteService,
    private router: Router,
    private authService: AuthenticationService,
    private matDialog: MatDialog,
    private location: Location,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,
  ) {

    this.currentUser = this.authService.currentUserSubject.getValue();

    this.permission = this.authService.checkPermission(sitemap.Institutions);
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);

    this.can_add = this.permission > 1 && this.currentUser.RoleType === 1;
    this.can_update = this.permission > 1 && (this.currentUser.RoleType === 1 || this.currentUser.RoleType === 2);
    this.can_delete = this.permission > 2 && this.currentUser.RoleType === 1;
    // show region only for agent login
    if(this.currentUser.RoleType!=1)
    {
      this.columns.splice(this.columns.findIndex(d => d.title === 'Add Stamp'), 1);
    }
    if (this.currentUser.RoleId != 2) {
      this.columns.splice(this.columns.findIndex(d => d.title === 'Region'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Status'), 1);
      this.columns.splice(this.columns.findIndex(d => d.title === 'Region Of Marketing'), 1);
    }
  }

  ngOnInit() {

    if (this.permission <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }

    if (this.currentUser.UserId > 0) {
      this.parentRoute = "member/"
    }
    this.listInstitute();
  }
  onCellHoverChanged(e) {

    try {
      if (e.eventType == 'mouseover' && e.column.caption == "Region" && e.data.Regions != '') {
        //this.ToolTipText ="something here ";
        this.ToolTipText = e.data.Regions;
        this.tooltip.instance.option("target", e.cellElement);
        this.tooltip.instance.show();
      }
      if (e.eventType == 'mouseout') {
        this.tooltip.instance.hide();
      }
    } catch (e) {

    }
  }

  listInstitute() {
    if (this.currentUser.RoleId === 2) {
      this.gridMessage = 'Loading';
      this.instService.listForAgent(this.formdata.keyword).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.dataList = res;
        this.gridMessage = 'No data';
      });
    }
    else {
      this.gridMessage = 'Loading';
      this.instService.list(this.formdata.keyword).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.dataList = res;
        this.gridMessage = 'No data';
      });
    }
  }

  delete(instid: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.instService.delete(instid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success', 'Institution deleted successfully');
          this.listInstitute();
        });
      }
    });


  }

  openInNewTab(instid: number) {
    window.open(this.location.prepareExternalUrl('/institutions/institutions-details/' + instid))
  }

  edit(instid: number) {
    if (instid) {
      if (this.currentUser.RoleId != 2) {

        this.router.navigate(['member/institutions/edit-institutions', instid], {});
      }
      else {
        window.open(this.location.prepareExternalUrl('/institutions/institutions-details/' + instid))
        //this.router.navigate(['institutions/institutions-details', instid], {});
      }
    }
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  openApplication(data: any) {
    if (this.currentUser.isPrimary === 1) {
      if (data.ApplicationId) {
        this.router.navigate(['/member/application-for-institution/edit-application/' + data.ApplicationId], { queryParams: { returnUrl: "/member/institutions" } });
      }
      else {
        if(data.RegionOfMarketing.toString().toLowerCase()==="outside")
        {
           this.matDialog.open(ConfirmBoxComponent,{data:{content:"Currently, Institution is not providing programs for your region.",yesLabel:"Continue",noLabel:"Cancel",icon:"info"}}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
              if(res)
              {
                this.router.navigate(['/member/application-for-institution/add-application/' + data.InstitutionId], { queryParams: { returnUrl: "/member/institutions" } });
              }
           });
        }
        else
        {
          this.router.navigate(['/member/application-for-institution/add-application/' + data.InstitutionId], { queryParams: { returnUrl: "/member/institutions" } });
        }
      }
    }
  }

  showMaterialDialog(instituteId: number) {
    this.matDialog.open(ShowInstitutionMaterialDialogComponent,
      {
        data: { instituteId: instituteId },
        width: '70%', minWidth: '400px'
      });
  }
  bulkUpdate(instId: number) {
    this.router.navigate(['member/institutions/bulkupdate', instId], {});
  }
  activitylog(){
    this.activityLog.activitylog(0, 'Institutions', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  changeStatus(instid: number,status:number) {
    // if(status==1){
    //    status=0; 
    // }
    // else
    // {
    //   status=1;
    // }
    this.matDialog.open(ConfirmBoxComponent, { data: { title: "Status", content: "Do you want to change status" } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.instService.statusChange(instid, status).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Institution status changed successfully");
            this.listInstitute();
          }
          else {
            this.toasterService.pop("error", res as any);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
