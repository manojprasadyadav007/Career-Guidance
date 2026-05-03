import { Component, OnInit, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { appPattern } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { ApplicationService } from 'app/services/application.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InstituteService } from 'app/services/institute.service';
import { ProgramService } from 'app/services/program.service';
import { ProgramFeeService } from 'app/services/program-fee.service';
import { ProgramIntekService } from 'app/services/program-intek.service';

@Component({
  selector: 'app-edit-program-detail-dialog',
  templateUrl: './edit-program-detail-dialog.component.html',
  styleUrls: ['./edit-program-detail-dialog.component.scss']
})
export class EditProgramDetailDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  currentUser: Login;
  permission: number;
  programInfoData: any;

  parentType: number;
  instFilter: any = '';
  programFilter: any = '';
  intakeFilter: any = '';
  specializationFilter: any = '';
  campusFilter: any = '';
  modeFilter: any = '';
  modelPattern = appPattern;

  title: string = 'Program information';

  parentId: number;

  institutionList: any[];
  programList: any[];
  feeList: any[];
  campusList: any[];
  programModeList: any[];
  intekList: any[];
  specializationList;
  program: any;

  genInfoData: any;

  OnShore;
  OffShore;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private applicatoinService: ApplicationService,
    authService: AuthenticationService,
    private toasterService: ToasterService,
    private institutionService: InstituteService,
    private programService: ProgramService,
    private programFeeService: ProgramFeeService,
    private programIntekService: ProgramIntekService,
    private matDialogRef: MatDialogRef<EditProgramDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.currentUser = authService.currentUserSubject.getValue();

    this.parentId = data.parentId;
    this.permission = data.permission;
    this.parentType = data.parentType;

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.get();

    this.institutionService.forDDL()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => { this.institutionList = res; });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onProgramFormSubmit(form: NgForm) {
    if (form.valid) {
      this.applicatoinService.updateProgramInfo(this.programInfoData)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success',this.title+' updated successfully');
          this.matDialogRef.close(true);
        });
    }
  }

  get() {
    if (this.parentType === 7) {
      this.applicatoinService.getSectionWise(this.parentId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.programInfoData = res.programInfo;
          this.genInfoData = res.genInfo;
          this.fillProgram(false);
        });
    }
  }

  onInstitutionChange() {
    this.programList = [];

    if (this.programInfoData.InstitutionId && this.programInfoData.InstitutionId > 0) {
      this.applicatoinService.checkInstitutionExists(this.genInfoData.StudentId, this.programInfoData.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res > 0 && res != this.parentId) {
          this.toasterService.pop('error', 'Another application already exists with this institution')
        }
        else {
          this.fillProgram(true);
          //this.fillCitizenShipCountry();
        }
      });
    }
    else {
      this.fillProgram(true);
      // this.fillCitizenShipCountry();
    }
  }

  fillProgram(reset: boolean) {
    this.programList = [];

    if (reset) {
      this.programInfoData.ProgramId = 0;
    }

    if (this.programInfoData) {
      if ((this.programInfoData.InstitutionId && this.programInfoData.InstitutionId > 0)) {
        this.programService.forDDL(this.programInfoData.InstitutionId)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.programList = res;
          });

        this.onProgramChange(reset);
      }
    }
  }


  onProgramChange(reset?: boolean) {
    this.campusList = [];
    this.programModeList = [];
    if (reset) {
      this.programInfoData.Campus = null;
      this.programInfoData.ApplicationMode = null;
    }

     this.program = null;
    if (this.programInfoData.ProgramId && this.programInfoData.ProgramId > 0) {
      this.programService.getdetail(this.programInfoData.ProgramId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.program = res;
          this.fillIntek(reset);
        });
    }

    this.fillCampus(reset);
    this.fillMode(reset);
    this.getSpecializationList(reset);

  }


  fillFeeList() {
    this.feeList = [];
    if (this.programInfoData && this.programInfoData.IntekId > 0) {
      this.programFeeService.forApplication({ IntakeId: this.programInfoData.IntekId, Nationality: this.programInfoData.Citizenship, ApplicationId: this.parentId })
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.feeList = res;
        });
    }
  }


  fillIntek(reset: boolean) {
    this.intekList = [];
    if (reset) {
      this.programInfoData.IntekId = 0;
    }

    if (this.programInfoData) {
      if (this.programInfoData.ProgramId && this.programInfoData.ProgramId > 0) {
        this.programIntekService.programIntakeForApplication(this.programInfoData.ProgramId, this.parentId, this.programInfoData.Citizenship)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.intekList = res;
            this.onIntakeChange(false);
          });
      }
    }
  }

  fillCampus(reset?: boolean) {
    if (reset) {
      this.programInfoData.Campus = null;
    }
    if (this.programInfoData && this.programInfoData.IntekId > 0) {
     
      this.programIntekService.campusList(this.programInfoData.IntekId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.campusList = res;
        });
    }
  }
  fillMode(reset?: boolean) {
    if (reset) {
      this.programInfoData.ApplicationMode = null;
    }
    if (this.programInfoData && this.programInfoData.ProgramId > 0) {
      this.programService.mode(this.programInfoData.ProgramId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.programModeList = res;

          //if only 1 mode available in program then set as selected
          if (this.programModeList.length === 1) {
            this.programInfoData.ApplicationMode = this.programModeList[0].ModeId;
            return;
          }

          //if previousaly selected mode available in changed program mode then set
          if (this.programInfoData.ApplicationMode != null || this.programInfoData.ApplicationMode != undefined) {
            if (!this.programModeList.find(d => d.ModeId === this.programInfoData.ApplicationMode)) {
              this.programInfoData.ApplicationMode = null;
            }
          }

          // set full time as default selected if available in program
          if (this.programInfoData.ApplicationMode === null || this.programInfoData.ApplicationMode === undefined) {
            if (this.programModeList.find(d => d.ModeId === 1)) {
              this.programInfoData.ApplicationMode = 1;
            }
          }
        });
    }
  }

  onIntakeChange(reset?:boolean) {
    if(reset)
    {      
      this.programInfoData.ShoreType=null;
      this.programInfoData.Campus=null;
    }    try {
      if (this.program) {
        this.program.SubmissionDeadline = this.intekList.filter(d => d.IntekId === this.programInfoData.IntekId)[0].SubmissionDeadline;
        this.program.OnshoreSubmissionDeadline = this.intekList.filter(d => d.IntekId === this.programInfoData.IntekId)[0].OnshoreSubmissionDeadline;
        this.OnShore = this.intekList.filter(d => d.IntekId === this.programInfoData.IntekId)[0].OnShore;
        this.OffShore = this.intekList.filter(d => d.IntekId === this.programInfoData.IntekId)[0].OffShore;

        if(this.OffShore == true && this.OnShore == false) { this.programInfoData.ShoreType = 0}
        if(this.OnShore == true && this.OffShore == false) { this.programInfoData.ShoreType = 1}
      }
      //this.fillCitizenShipCountry();
      this.fillFeeList();
      this.fillCampus();
    }
    catch (e) {
      this.program.SubmissionDeadline = '';
    }
  }

  getSpecializationList(reset?: boolean) {
    if (reset) {
      this.programInfoData.SpecializationId = null;
    }

    this.specializationList = null;
    if (this.programInfoData.ProgramId && this.programInfoData.ProgramId > 0) {
      this.programService.getSpecializationList(this.programInfoData.ProgramId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.specializationList = res;
          // if (this.specializationList.length == 1) {

          //   this.programInfoData.SpecializationId = this.specializationList[0].SpecializationId;
          // }
        });
    }

  }

}
