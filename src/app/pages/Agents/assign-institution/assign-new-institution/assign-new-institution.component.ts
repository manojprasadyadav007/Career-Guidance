import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { AgentInstitutionService } from 'app/services/agent-institution.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { InstituteService } from 'app/services/institute.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { MiscService } from 'app/services/misc.service';
import { NgForm } from '@angular/forms';
import { appPattern } from "app/models/site-map.model";
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-assign-new-institution',
  templateUrl: './assign-new-institution.component.html',
  styleUrls: ['./assign-new-institution.component.scss']
})
export class AssignNewInstitutionComponent implements OnInit, OnDestroy {
  
  agentId: number = 0;
  formdata: any;
  institutionList: any[];
  currentUser:Login;
  flagdisabled:boolean = false;
  regionList: any[];
  ZoneList: any[];
  instFilter:any = '';
  regionFilter:any = '';
  zoneFilter:any ='';
  modelPattern = appPattern;

  agentCodePattern= appPattern.agentCode;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private agentInstitutionService: AgentInstitutionService,
    private dialogRef: MatDialogRef<AssignNewInstitutionComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    authservice:AuthenticationService,
    private instService:InstituteService,
    private instCountryService: InstCountryService,
    private miscService: MiscService,
  ) {
    this.currentUser = authservice.currentUserSubject.getValue();
    this.agentId = data.AgentId;
  }

  ngOnInit() {
    this.fillInstitutionList();
    this.resetForm();
  }

  resetForm() {
    this.formdata = {
      InstitutionId:0,
      AgentId: this.agentId
    };
  }

  onSubmit(form:NgForm) {
    if(form.invalid)
    {
      return;
    }
    this.flagdisabled = true; 
    this.agentInstitutionService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dialogRef.close(true);
    }, err =>{
      this.flagdisabled = false;
    });
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

  listZone() {
    this.ZoneList = [];

    if (this.formdata.RegionId > 0) {
      this.miscService.zone(this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.ZoneList = res;
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
