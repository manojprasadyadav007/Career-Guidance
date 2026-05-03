import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { AgentInstitutionService } from 'app/services/agent-institution.service';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { InstituteService } from 'app/services/institute.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { MiscService } from 'app/services/misc.service';
import { NgForm } from '@angular/forms';
import { appPattern } from "app/models/site-map.model";
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MSMAgentService } from 'app/services/msmagent.service';
import { AssignedAgentComponent } from '../assigned-agent/assigned-agent.component';
import { UserAgentService } from 'app/services/user-agent.service';
import { ToasterService } from 'angular2-toaster';
import { UserAgent } from 'app/models/user-agent.model';

@Component({
  selector: 'app-assign-new-agent',
  templateUrl: './assign-new-agent.component.html',
  styleUrls: ['./assign-new-agent.component.scss']
})
export class AssignNewAgentComponent implements OnInit, OnDestroy {

  agentId: number = 0;
  formdata: any;
  institutionList: any[];
  provinceList: any[];
  currentUser: Login;
  flagdisabled: boolean = false;
  regionList: any[];
  countryList: any[];
  ZoneList: any[];
  instFilter: any = '';
  regionFilter: any = '';
  zoneFilter: any = '';
  checkBoxValue: boolean;
  modelPattern = appPattern;
  studentList: MatTableDataSource<any>;
  keyword: string = '';
  columnToDisplay: string[] = ['Name', 'Email', 'MobileNo', 'City', 'Education', 'Action'];
  ddl_countryid: any;
  ddl_provinceid: any;
  keyworderror: string = undefined;
  private onDestroy$: Subject<void> = new Subject<void>();
  dataList: UserAgent[];
  columns: any[] = [
    { dataField: 'AgentName', title: 'Name', type: '', format: '' },
    { dataField: 'CountryName', title: 'Country', type: '', format: '' },
    { dataField: 'ProvinceName', title: 'Province', type: '', format: '' },
    { dataField: 'City', title: 'City', type: '', format: '' },

  ];
  showFilterRow: boolean = false;
  excel_permisson: number = 0;
  allMode: string;
  checkBoxesMode: string;
  agentCodePattern = appPattern.agentCode;
  country_ddl_val: any;
  userId: any;
  AgentList: any[];
  permission: any;
  isAgentAssigned: any;
  provineFilter: string = '';
  contryFilter: string = '';

  selectedProgram: any[];
  clearAlldisabled = true;
  disableGrid = false;

  showButtons = false;
  gridMessage='No Data';
  constructor(private agentInstitutionService: AgentInstitutionService,
    private dialogRef: MatDialogRef<AssignNewAgentComponent>,

    @Inject(MAT_DIALOG_DATA) data,
    authservice: AuthenticationService,
    private instService: InstituteService,
    private instCountryService: InstCountryService,
    private miscService: MiscService,
    private msmService: MSMAgentService,
    private userAgentService: UserAgentService,
    private toasterService: ToasterService
  ) {
    this.currentUser = authservice.currentUserSubject.getValue();
    this.userId = data.UserId;
    this.permission = data.Permission;
  }



  ngOnInit() {
    this.fillInstitutionList();
    this.resetForm();
    this.fillCountry();
    
  }


  onStatusChange(e, d) {
    if (e.checked == true) {
      this.disableGrid = true
      this.userAgentService.assignAgent(this.userId, d.AgentId, 0).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList.forEach((ele) => {
          if (ele.AgentId == d.AgentId) {
            ele.AgentisAssigned = true;
          }
        });
        this.clearAlldisabled = false;
        this.disableGrid = false
        this.toasterService.pop("success", "Agent assigned successfully");
      });
    }
    if (e.checked == false) {
      this.disableGrid = true
      this.userAgentService.deleteassignAgent(this.userId, d.AgentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList.forEach((ele) => {
          if (ele.AgentId == d.AgentId) {
            ele.AgentisAssigned = false;
          }
        });
        this.disableGrid = false
        this.toasterService.pop("success", "Agent unassigned successfully");
      });
    }
  }

  listAgent() {
    this.gridMessage='Loading...';
    this.userAgentService.getAgentByUserId(this.userId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      let agentlist = res;

      if (this.dataList) {
        this.dataList.forEach((ele: any) => {
          agentlist.forEach((e: any) => {
            if (ele.AgentId == e.AgentId) {
              ele.AgentisAssigned = true;
              this.clearAlldisabled = false;
            }
          })
        });
        this.disableGrid = false
      }
      this.gridMessage='No Data';

    });
  }




  resetForm() {
    this.formdata = {
      keyword: '',
      CountryId: '',
      ProvinceId: ''
    };
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }


  onSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    if (!this.ddl_provinceid) {
      this.ddl_provinceid = 0;
    }
    this.msmService.getAssignedAgentList(this.keyword, this.country_ddl_val, this.ddl_provinceid).pipe(takeUntil(this.onDestroy$)).subscribe((res: UserAgent[]) => {
      this.dataList = res;
      if(this.dataList.length) {  this.showButtons = true;}  else {  this.showButtons = false;}

      this.listAgent();
    });
  }

  changeProvinceOption(pid) {
    this.ddl_provinceid = pid;
  }

  fillInstitutionList() {
    this.instService.forDDLBYPartnerType(1).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.institutionList = res;
    })
  }

  listRegion() {
    this.regionList = [];
    if (this.formdata.InstitutionId > 0) {
      this.instCountryService.list(this.formdata.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.regionList = res;
      });
    }
  }

  selectAllProgram(checked: boolean) {

    this.disableGrid = true
    if (!this.dataList.length) {
      this.disableGrid = false
      return
    }
    let agentsId = [];
    if (checked) {
      agentsId = this.dataList.filter((ele: any) => ele.AgentisAssigned === false)

      if (!agentsId.length) {
        this.disableGrid = false
        return;
      }
      this.dataList.map((ele: any) => {
        ele.AgentisAssigned = true;
        this.clearAlldisabled = false
      })

      agentsId = agentsId.map((ele: any) => {
        return ele.AgentId;
      })
   
      if (agentsId) {
        const assignAgents = agentsId.join().toString().replace(/^,|,$|(,+)/g, (g1) => g1 ? ',' : '');
        this.userAgentService.assignBulkAgent(this.userId, assignAgents, 0).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.disableGrid = false
          this.toasterService.pop("success", "Agents assigned successfully");
        });
      }
    }
    else {
      agentsId = this.dataList.filter((ele: any) => ele.AgentisAssigned === true);

      if (!agentsId.length) {
        this.disableGrid = false
        return;
      }
      this.dataList.map((ele: any) => {
        ele.AgentisAssigned = false;
      })

      agentsId = agentsId.map((ele: any) => {
        return ele.AgentId;
      })
    
      if (agentsId) {
        const unassigneAgents = agentsId.join().toString().replace(/^,|,$|(,+)/g, (g1) => g1 ? ',' : '');
        this.userAgentService.deleteBulkAssignAgent(this.userId, unassigneAgents).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.clearAlldisabled = true
          this.disableGrid = false
          this.toasterService.pop("success", "Agents unassigned successfully");
        });
      }

    }
  }

  // listAssignedAgent(keyword, cid, pid) {
  //   this.regionList = [];
  //   if (this.formdata.InstitutionId > 0) {
  //     this.msmService.getAssignedAgentList(keyword, cid, pid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
  //       this.regionList = res;
  //     });
  //   }
  // }

  changeOption(val) {
    this.country_ddl_val = val;
    this.listProvince(val);
  }

  fillCountry() {
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
      });
  }

  listZone() {
    this.ZoneList = [];

    if (this.formdata.RegionId > 0) {
      this.miscService.zone(this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.ZoneList = res;
      });
    }
  }

  listProvince(countryId) {
    this.miscService.province(countryId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.provinceList = res;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
