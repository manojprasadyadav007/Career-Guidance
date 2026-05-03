import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InstituteService } from 'app/services/institute.service';
import { ProgramService } from 'app/services/program.service';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { MSMAgentService } from 'app/services/msmagent.service';
import { FeeWaiverService } from 'app/services/fee-waiver.service';
import { MiscService } from 'app/services/misc.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { InstitutionIntakeService } from 'app/services/institution-intake.service'


@Component({
  selector: 'app-add-agent-fee-waiver',
  templateUrl: './add-agent-fee-waiver.component.html',
  styleUrls: ['./add-agent-fee-waiver.component.scss']
})
export class AddAgentFeeWaiverComponent implements OnInit  , OnDestroy{

  formdata: any;
  btnLabel: String = 'Add';

  permission: number = 0;
  regFilter:any='';
  agentFilter:any='';
  instFilter:any='';
  prgFilter:any='';
  intakeFilter:any='';
  agentList: any[];
  instList: any[];
  programList: any[];
  intakeList: any[];
  countryList: any[];
  mindata = new Date();
  flagStatus :any= false;
  flagdisabled:boolean =false;
  private onDestroy$: Subject<void> = new Subject<void>();


  constructor(private feeWaiverService: FeeWaiverService,
    private dialogRef: MatDialogRef<AddAgentFeeWaiverComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private institutionService: InstituteService,
    private programService: ProgramService,
    private intakeService: ProgramIntekService,
    private agentService: MSMAgentService,
    private miscService: MiscService,
    private toasterService: ToasterService,
    private institutionIntakeService :InstitutionIntakeService
  ) {

    this.formdata = {
      WaiverId: data.WaiverId | 0,
      AgentId: null,
      UptoDate: null,
      NoOfDays: null,
      NoOfApplication: null,
      IntakeId: null,
      InstitutionId: null,
      ProgramId: null,
      WaiverPer: null,
      CountryId: null
    }
    this.permission = data.permission | 0;
  }

  ngOnInit() {
    this.fillRegion();
    this.get();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  save(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.flagdisabled = true;
    if (this.formdata.WaiverId > 0) {
      this.feeWaiverService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if(res){

        this.dialogRef.close(true);
        this.toasterService.pop('success','Fee waiver updated successfully');
      }
      },err=>{
        this.flagdisabled =false;
      });
    }
    else {
      this.feeWaiverService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if(res){
          this.dialogRef.close(true);
          this.toasterService.pop('success','Fee waiver saved successfully');
        }
        
      },err =>{
        this.flagdisabled = false;
      });
    }
  }


  get() {
    if (this.formdata.WaiverId > 0) {
      this.feeWaiverService.get(this.formdata.WaiverId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.formdata = res;
          this.fillAgent();
          this.fillInstitution();
          this.fillProgram();
          this.fillIntake();

          this.btnLabel = 'Update';
        })
    }
  }

  fillAgent(reset?: boolean) {
    this.agentList = [];
    this.instList = [];
    this.programList = [];
    this.intakeList = [];
    if (reset) {
      this.formdata.AgentId = null;
    }
    if (this.formdata.CountryId != null) {
      this.agentService.forDDLByCountry(this.formdata.CountryId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.agentList = res;
      });
    }
  }

  fillInstitution(reset?: boolean) {
    this.instList = [];
    this.programList = [];
    this.intakeList = [];
    if (reset) {
      this.formdata.InstitutionId = null;
    }
    if (this.formdata.AgentId != null && this.formdata.CountryId != null) {
      this.institutionService.forDDLByAgentAndCountry(this.formdata.AgentId, this.formdata.CountryId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.instList = res;
        });
    }
  }

  fillProgram(reset?: boolean) {
    this.programList = [];
    this.intakeList = [];
    if (reset) {
      this.formdata.ProgramId = null;
      this.formdata.IntakeId = null;
    }
    if (this.formdata.InstitutionId && this.formdata.InstitutionId > 0) {
      this.programService.forDDLByAgentAndCountry(this.formdata.InstitutionId, this.formdata.AgentId, this.formdata.CountryId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.programList = res;
        });
    }
  }

  OnprogramChange(){
    if(this.flagStatus && this.formdata.ProgramId == 0){
      this.fillIntake(true);
    }
    if(this.formdata.ProgramId && this.formdata.ProgramId > 0){
          this.fillIntake(true);
       }
   this.flagStatus =true;
  }

  fillIntake(reset?: boolean) {
    this.intakeList = [];
    if (reset) {
      this.formdata.IntakeId = null;
    }
//this.formdata.ProgramId && this.formdata.ProgramId > 0
    if ( this.formdata.InstitutionId && this.formdata.InstitutionId > 0) {
    let programId=  this.formdata.ProgramId == null ? 0 : this.formdata.ProgramId
      this.institutionIntakeService.ForDDLByAgentAndCountry( this.formdata.InstitutionId , programId, this.formdata.AgentId, this.formdata.CountryId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.intakeList = res;
        });
    }


  }

  getDateRequired() {
    try {
      if (this.formdata.NoOfApplication && this.formdata.NoOfApplication.toString().length > 0) {
        return false;
      }
      else if (this.formdata.NoOfDays && this.formdata.NoOfDays.toString().length > 0) {
        return false;
      }
      else if (this.formdata.UptoDate && this.formdata.UptoDate.toString().length > 0) {
        return false;
      }
      else {
        return true;
      }
    }
    catch (e) {
      return true;
    }

  }

  fillRegion() {
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
      });
  }

}
