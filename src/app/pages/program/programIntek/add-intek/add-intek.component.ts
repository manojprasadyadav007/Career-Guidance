import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ProgramIntek } from 'app/models/program-intek.model';
import { MatCheckboxChange, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { NgForm } from '@angular/forms';
import { MiscService } from 'app/services/misc.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { environment } from 'environments/environment';
import { InstCountryService } from 'app/services/inst-country.service';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { appPattern } from 'app/models/site-map.model';
import { ProgramService } from 'app/services/program.service';

@Component({
  selector: 'app-add-intek',
  templateUrl: './add-intek.component.html',
  styleUrls: ['./add-intek.component.scss']
})
export class AddIntekComponent implements OnInit, OnDestroy {

  requiredShoreType:boolean=false;
  modelPattern = appPattern;
  programId: number = 0;
  instituionId: number = 0;
  formdata: ProgramIntek;
  campusList: any=[];
  campusFilter:any;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  selectList: any[];
  btnLable: string = "Update";
  currentUser: Login;
  env: any = environment;
  regionList: any[];
  flagdisabled: Boolean = false;
  zoneList: any[];

  regionFilter: any = '';
  statusFilter: any = '';
  zoneFilter: any = '';
  permission: number = 0;
  onShoreDateReqd = false;
  offShoreDateReqd = false;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private intekService: ProgramIntekService,
    private dialogRef: MatDialogRef<AddIntekComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private miscService: MiscService,
    private programService: ProgramService,
    private authService: AuthenticationService,
    private instCountry: InstCountryService,
    private toasterService: ToasterService
  ) {
    this.instituionId = data.institutionId;
    this.permission = data.permission;
    this.formdata = {
      IntekId: data.IntekId,
      ProgramId: data.programId,
      IntakeName: '',
      Campus: [],
      IntekDate: '',
      IntekStatus: 0,
      SubmissionDeadline: '',
      OnshoreSubmissionDeadline: '',
      Capacity: '',
      OfferLetterTAT: '',
      LOA_TAT: '',
      FeeReceiveTAT: '',
      RegionId: -1,
      ZoneId: -1,
      OnShore: false,
      OffShore: false,
    };

    if (data.closeAfterAdd === undefined) {
      this.closeAfterAdd = true;
    }
    else {
      this.closeAfterAdd = data.closeAfterAdd;
    }
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.listStatus();
    this.fillRegion();
    this.fillCampus();
    if (this.formdata.IntekId > 0) {
      this.getIntek();
    }
  }

  resetForm() {

    this.formdata = {
      IntekId: 0,
      IntakeName: '',
      IntekDate: '',
      Campus: [],
      ProgramId: this.programId,
      IntekStatus: 0,
      SubmissionDeadline: '',
      OnshoreSubmissionDeadline: '',
      Capacity: '',
      OfferLetterTAT: '',
      LOA_TAT: '',
      FeeReceiveTAT: '',
      RegionId: -1,
      ZoneId: -1
    };
  }

  onSubmit(form: NgForm) {

    if(this.formdata.OnShore==false&&this.formdata.OffShore==false)
    {
      this.requiredShoreType=true;
      return;
    }


    if (form.invalid) {
      return;
    }

    this.flagdisabled = true;
    if (this.formdata.IntekId > 0) {
      this.intekService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Intake updated successfully');
        this.isAdd = true;
        this.close();
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {

      this.intekService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Intake saved successfully');
        this.isAdd = true;
        if (this.closeAfterAdd) {
          this.close();
        }
        else {
          this.flagdisabled = false;
          form.reset();
          this.resetForm();
        }
      }, err => {
        this.flagdisabled = false;
      });
    }

  }

  close() {
    this.dialogRef.close(this.isAdd);
  }

  getIntek() {
    this.intekService.get(this.formdata.IntekId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formdata = res;
      if(this.formdata.OffShore) { this.offShoreDateReqd = true }
      if(this.formdata.OnShore) { this.onShoreDateReqd = true }
      this.btnLable = "Update";
      this.fillZone(false);
    });
  }

  fillCampus() {
    this.programService.campus(this.formdata.ProgramId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.campusList = res;
    })
  }

  offShoreChange(event: MatCheckboxChange) {
    if(event.checked)
    {
      this.requiredShoreType=false;
    }
    else
    if(this.formdata.OnShore==false)
    {
      this.requiredShoreType=true;
    }
    this.offShoreDateReqd = event.checked;
  }

  onShoreChange(event: MatCheckboxChange) {
    if(event.checked)
    {
      this.requiredShoreType=false;
    }
    else
    if(this.formdata.OffShore==false)
    {
      this.requiredShoreType=true;
    }
    this.onShoreDateReqd = event.checked;
  }

  listStatus() {
    this.miscService.statuslist(3, this.currentUser.RoleId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.selectList = res;
    });
  }

  fillRegion() {
    this.instCountry.list(this.instituionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.regionList = res;
    })
  }

  fillZone(reset: boolean) {
    this.zoneList = [];
    if (reset) {
      this.formdata.ZoneId = -1;
    }

    if (this.formdata.RegionId > 0) {
      this.miscService.zone(this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.zoneList = res;
      })
    }

  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
