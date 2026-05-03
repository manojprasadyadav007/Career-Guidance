import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { environment } from 'environments/environment';
import { InstitutionIntakeService } from 'app/services/institution-intake.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MiscService } from 'app/services/misc.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { NgForm } from '@angular/forms';
import { ProgramService } from 'app/services/program.service';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { appPattern } from 'app/models/site-map.model';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';


@Component({
  selector: 'app-add-institution-intake',
  templateUrl: './add-institution-intake.component.html',
  styleUrls: ['./add-institution-intake.component.scss']
})
export class AddInstitutionIntakeComponent implements OnInit, OnDestroy {

  instituionId: number = 0;
  formdata: any;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  selectList: any[];
  btnLable: string = "Add";
  currentUser: Login;
  env: any = environment;
  regionList: any[];
  regionFilter: any = '';
  zoneList: any[];
  flagdisabled: boolean = false;
  programList: any[];
  modelPattern = appPattern;
  statusFilter: any = '';
  typeDisabled = true;

  onShoreCheckbox = false;
  offShoreCheckbox = false;
  programSelect = false;

  onShoreDateReqd = false;
  offShoreDateReqd = false;
  columns: any[] = [
    { dataField: 'ProgramName', title: 'Program', type: '', format: '' }]

  permission: number = 0;
  gridMessage='No Data';

  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private intekService: InstitutionIntakeService,
    private dialogRef: MatDialogRef<AddInstitutionIntakeComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private miscService: MiscService,
    private authService: AuthenticationService,
    private instCountry: InstCountryService,
    private programService: ProgramService,
    private toasterService: ToasterService,
    private mandatoryfieldCheckService: MandatoryfieldCheckService,
  ) {
    this.instituionId = data.InstitutionId;
    this.permission = data.permission;
    this.formdata = {
      IntakeGroupId: data.IntakeGroupId,
      IntakeName: '',
      IntekDate: '',
      IntekStatus: 0,
      SubmissionDeadline: '',
      OnshoreSubmissionDeadline: '',
      Capacity: '',
      OfferLetterTAT: '',
      LOA_TAT: '',
      FeeReceiveTAT: '',
      RegionId: null,
      ProgramIds: null,
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
    if (this.formdata.IntakeGroupId > 0) {
      this.getIntek();
    } else {
//      this.fillProgram()
      this.program()
    }
  }

  resetForm() {

    this.formdata = {
      IntakeGroupId: 0,
      IntakeName: '',
      IntekDate: '',
      ProgramIds: null,
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

    if (form.invalid) {
     
      this.mandatoryfieldCheckService.setinvalidFields();
      return;
    }



   // this.flagdisabled = true;
    // if(this.formdata.ProgramIds = this.programList.filter(d => d.Selected).map(d => d.Campus==undefined))
    // {
    //   console.log('called')
    //   this.formdata.ProgramIds = this.programList.filter(d => d.Selected).map(d => { return { ProgramId: d.ProgramId, OnShore: d.OnShore, OffShore: d.OffShore , Campus:''} });            
    // }
    // else{
      this.formdata.ProgramIds = this.programList.filter(d => d.Selected).map(d => { return { ProgramId: d.ProgramId, OnShore: d.OnShore, OffShore: d.OffShore , Campus:d.Campus==undefined ? '':d.Campus.join(',') } });
    //}
    
    if (!this.formdata.ProgramIds.length) {
      this.programSelect = true;
      return; 
    }
    this.flagdisabled = true;
    if (this.formdata.IntakeGroupId > 0) {
      
      this.intekService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Intake updated successfully');
        this.isAdd = true;
        this.flagdisabled = false;
        this.close();
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {
      this.intekService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Intake saved successfully');
        this.isAdd = true;
        this.flagdisabled = false;
        if (this.closeAfterAdd) {
          this.close();
        }
        else {

          form.reset();
          this.resetForm();
        }
      }, err => {
        this.flagdisabled = false;
      });
    }

  }

  onStatusChange(event, data) {
    data.Selected = event.checked;
  }

  onStatusChangeOnShore(event, data) {
    data.OnShore = event.checked;
    this.programSelect = false;
    if (!data.OffShore) { data.Selected = event.checked; }
    const onShore = this.programList.filter((ele) => ele.OnShore == true);
    if (onShore.length > 0) { this.onShoreDateReqd = true; } else { this.onShoreDateReqd = false; }
  }

  onStatusChangeOffShore(event, data) {
    data.OffShore = event.checked;
    this.programSelect = false;
    if (!data.OnShore) { data.Selected = event.checked; }
    const offShore = this.programList.filter((ele) => ele.OffShore == true);
    if (offShore.length > 0) { this.offShoreDateReqd = true; } else { this.offShoreDateReqd = false; }
  }



  close() {
    this.dialogRef.close(this.isAdd);
  }

  getIntek() {
    this.intekService.get(this.formdata.IntakeGroupId, this.instituionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.programList = res.Programs;
      const onShore = this.programList.filter((ele) => ele.OnShore == true);
      if (onShore.length > 0) { this.onShoreDateReqd = true; }
      if (onShore.length === this.programList.length) {
        this.onShoreCheckbox = true;
      }

      const offShore = this.programList.filter((ele) => ele.OffShore == true);
      if (offShore.length > 0) { this.offShoreDateReqd = true; }

      if (offShore.length === this.programList.length) {
        this.offShoreCheckbox = true;
      }

      this.formdata = res.data;

      this.btnLable = "Update";
    });
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


  program()
  {
    this.gridMessage='Loading...';
    this.programService.ForProgramIntakeList(this.instituionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.programList = res;
      this.gridMessage='No Data';
    });
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }



  onShoreSelectAll(val) {
    this.programSelect = false;
    if (val.checked) {
      this.programList.map((ele) => {
        ele.OnShore = true;
        ele.Selected = true;
      });
    } else {
      this.programList.map((ele) => {
        if(ele.UsedOnShore) { return;}
        ele.OnShore = false;
        if (ele.OffShore) {
          ele.Selected = true;
        } else {
          ele.Selected = false;
        }
      });
    }
    const onShore = this.programList.filter((ele) => ele.OnShore == true);
    if (onShore.length > 0) { this.onShoreDateReqd = true; } else { this.onShoreDateReqd = false; }
  }

  offShoreSelectAll(val) {
    this.programSelect = false;
    if (val.checked) {
      this.programList.map((ele) => {
        ele.OffShore = true;
        ele.Selected = true;
      });
    } else {
      this.programList.map((ele) => {
        if(ele.UsedOffShore) { return;}
        ele.OffShore = false;
        if (ele.OnShore) {
          ele.Selected = true;
        } else {
          ele.Selected = false;
        }
      });
    }
    const offShore = this.programList.filter((ele) => ele.OffShore == true);
    if (offShore.length > 0) { this.offShoreDateReqd = true; } else { this.offShoreDateReqd = false; }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
