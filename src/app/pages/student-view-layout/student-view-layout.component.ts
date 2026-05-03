import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditGeneralInfoDialogComponent } from './edit-general-info-dialog/edit-general-info-dialog.component';
import { EditProgramDetailDialogComponent } from './edit-program-detail-dialog/edit-program-detail-dialog.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { EditEducationBackgroundDialogComponent } from './edit-education-background-dialog/edit-education-background-dialog.component';
import { EditTestScoreDialogComponent } from './edit-test-score-dialog/edit-test-score-dialog.component';
import { EditCreditCardInfoDialogComponent } from './edit-credit-card-info-dialog/edit-credit-card-info-dialog.component';
import { UserService } from 'app/services/user.service';
import { MSMAgentService } from 'app/services/msmagent.service';
import { ApplicationService } from 'app/services/application.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { NgForm } from '@angular/forms';
import { ProgramDocumentService } from 'app/services/program-document.service';
import { leadSource, leadStatus, enumToName, parentType } from 'app/models/site-map.model';
import { environment } from 'environments/environment';
import { ApplicationCCService } from 'app/services/application-cc.service';
import { InputBoxDialogComponent } from 'app/utility/input-box-dialog/input-box-dialog.component';
import { AppDefaultValue } from 'app/models/site-map.model';


@Component({
  selector: 'app-student-view-layout',
  templateUrl: './student-view-layout.component.html',
  styleUrls: ['./student-view-layout.component.scss']
})
export class StudentViewLayoutComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  genInfo: any;

  @Input()
  programInfo: any;

  @Input()
  eduInfo: any;

  @Input()
  testScore: any;

  @Input()
  ccInfo: any;

  @Input()
  otherInfo: any;

  @Input()
  parentId: number;

  @Input()
  parentType: number;

  @Input()
  permission: number;

  parentName: string = 'Student';



  @Input()
  feeList: any[];
   

  @Input()
  mode: number = 0;

  @Output()
  onUpdate: EventEmitter<any> = new EventEmitter();

  editAdmission: boolean = false;
  currentUser: Login;
  hideCCGetCode:boolean = true;

  counselorList: any[];
  agentList: any[];
  marketingManagerList: any[];
  admissionExecutiveList: any[];

  @Output()
  onDocumentChange: EventEmitter<any> = new EventEmitter();

  @Output()
  onPendingDocumentUpdate: EventEmitter<string[]> = new EventEmitter();

  requiredDocumentList: any[] = [];

  leadSource = leadSource;
  leadStatus = leadStatus;
  getName = enumToName;
  originDetails = {};
  today: Date = new Date();

  filepath = environment.filepath;

  flagdisabled: boolean = false;
  agentFilter:any='';
  counselorFilter:any='';
  marketmanagerFilter:any='';
  admissionExeFilter:any ='';
  englishExamTypeR: any = AppDefaultValue.englishExamRange;
  testSettings: any;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private matDialog: MatDialog,
    authService: AuthenticationService,
    private userService: UserService,
    private agentService: MSMAgentService,
    private applicationService: ApplicationService,
    private toasterService: ToasterService,
    private programDocumentService: ProgramDocumentService,
    private applicationCCService: ApplicationCCService,
  ) {
    this.currentUser = authService.currentUserSubject.getValue();
  }

  ngOnInit() {
    if (+this.parentType === 7) {
      this.parentName = 'Application';
    }
    if(+this.parentType === 6 && +this.mode===3) {
      this.parentName = 'Lead';
    }
    if(this.currentUser.RoleId ==3 && +this.parentType === 7){
      this.originDetails = { id : this.genInfo.StudentId , type : 'studentDoc'}
    }
    this.testSettings = this.englishExamTypeR.find(s => s.Name === this.testScore.EnglishExamName);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  func() {
    return this.editAdmission ? "Close" : "Edit"
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['programInfo'] &&
      (!changes['programInfo'].previousValue || changes['programInfo'].previousValue.ProgramId != changes['programInfo'].currentValue.ProgramId)) {
        this.fillRequiredDocument();
    }
    else if (changes['genInfo'] && (!changes['genInfo'].previousValue || changes['genInfo'].previousValue.Citizenship != changes['genInfo'].currentValue.Citizenship)) {
      this.fillRequiredDocument();
    }
    else if (changes['testScore'] && (!changes['testScore'].previousValue || changes['testScore'].previousValue.EnglishExamName != changes['testScore'].currentValue.EnglishExamName)) {
      this.fillRequiredDocument();
      this.testSettings = this.englishExamTypeR.find(s => s.Name === this.testScore.EnglishExamName);
    }
  }


  editGenInfo() {
    this.matDialog.open(EditGeneralInfoDialogComponent, { data: { parentId: this.parentId, parentType: this.parentType, permission: this.permission, intakeId: (this.programInfo ? this.programInfo.IntekId : undefined), mode: this.mode } })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.onUpdate.emit('genInfo');
        }
      }); 
  }

  editProgramInfo() {
    this.matDialog.open(EditProgramDetailDialogComponent, { data: { parentId: this.parentId, parentType: this.parentType, permission: this.permission } })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.onUpdate.emit('programInfo');
        }
      });
  }

  editEducationBackground() {
    this.matDialog.open(EditEducationBackgroundDialogComponent, { data: { parentId: this.parentId, parentType: this.parentType, permission: this.permission } })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.onUpdate.emit('eduInfo');
        }

      });
  }

  editTestScore() {
    this.matDialog.open(EditTestScoreDialogComponent, { data: { parentId: this.parentId, parentType: this.parentType, permission: this.permission } })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.onUpdate.emit('testScore');
          
        }
      });
  }

  editCreditCardInfo() {
    this.matDialog.open(EditCreditCardInfoDialogComponent, { data: { parentId: this.parentId, parentType: this.parentType, permission: this.permission } })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.onUpdate.emit('ccInfo');
        }
      });
  }

  editAdmissionDetail() {
    if (!this.editAdmission) {
      if (!this.agentList) {
        this.fillAgentList();
      }
      if (!this.counselorList) {
        this.fillCounselor();
      }
      if (!this.marketingManagerList) {
        this.fillMarketingManagerAndAdmissionExe();
      }
      this.editAdmission = true;
    }
    else {
      this.editAdmission = false;
    }
  }

  updateAgent() {
    this.applicationService.updateAdmissionDetail(this.parentId, this.parentType, this.genInfo.AgentId, 'agent')
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Agent updated successfully');
        this.fillCounselor(true);
        this.onUpdate.emit('agent');
      });
  }

  updateAssignedTo() {
    this.applicationService.updateAdmissionDetail(this.parentId, this.parentType, this.genInfo.AssignedTo, 'counselor')
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.onUpdate.emit('counselor');
        this.toasterService.pop('success', 'Counsellor updated successfully');
      });
  }

  updateMarketingManager() {
    this.applicationService.updateAdmissionDetail(this.parentId, this.parentType, this.genInfo.MarketingManager, 'marketingManager')
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.onUpdate.emit('marketingManager');
        this.toasterService.pop('success', 'Marketing Manager updated successfully');
      });
  }

  updateAdmissionExecutive() {
    this.applicationService.updateAdmissionDetail(this.parentId, this.parentType, this.genInfo.AdmissionExecutive, 'admissionExecutive')
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.onUpdate.emit('admissionExecutive');
        this.toasterService.pop('success', 'Admission Executive updated successfully');
      });
  }

  fillCounselor(reset?: boolean) {
    if (reset) {
      this.counselorList = [];
      this.genInfo.AssignedTo = 0;
    }
    if (this.mode > 0 && this.genInfo.AgentId > 0) {
      this.userService.forDDLByAgent('2', '', this.genInfo.AgentId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.counselorList = res;
        });
    }
  }

  fillMarketingManagerAndAdmissionExe() {
    if (this.currentUser.RoleType === 1) {
      this.userService.forDDLByRoleType("", "", 0, 0, "1", "")
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.marketingManagerList = res;
          this.admissionExecutiveList = res;
        });
    }
  }

  fillAgentList() {
    if (this.currentUser.RoleType > 0) {
      if (this.parentType === parentType.Application) {
        this.agentService.forDDLForApplication(this.programInfo.InstitutionId)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.agentList = res;
          });
      }
      else {
        this.agentService.ForDDLForStudent()
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.agentList = res;
          });
      }

    }
  }

  updateOtherInfo(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.applicationService.updateOtherInfo({ ApplicationId: this.parentId, FormValue: this.otherInfo })
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Additional info updated successfully');
      });
  }

  fillRequiredDocument() {

    if (this.parentType === 7) {
      if (this.programInfo && this.programInfo.ProgramId && this.programInfo.ProgramId > 0
        && this.genInfo && this.genInfo.Citizenship > 0) {
        this.programDocumentService.listForApplication(this.parentId, this.programInfo.ProgramId, this.genInfo.Citizenship).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.requiredDocumentList = res;
        });
      }
    }
  }

  getTime(d: Date) {
    try {
      if (d) {
        return new Date(d).getTime();
      }
      else {
        return false;
      }
    }
    catch (e) {
      return false;
    }

  }

  getCode() {
    this.flagdisabled = true;
    this.applicationCCService.getCode(this.parentId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res === 'OK') {
          this.openVerifyDialog();
          }
        else {
          this.toasterService.pop('error', res);
          this.flagdisabled = false;
        }
      }, err => {
        this.flagdisabled = false;
       });
  }

  verifyCode(code: string) {
    this.flagdisabled = true;
    this.applicationCCService.verifyCode(this.parentId, code)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res === 'OK') {
          this.currentUser.isViewCT = true;
          this.hideCCGetCode = false;
        }
        else {
          this.toasterService.pop('error', res);
              if(!res.includes("expired")){
                this.openVerifyDialog();
              }
        }
        this.flagdisabled = false;
      }, err => {
        this.flagdisabled = false;
      });
  }

  openVerifyDialog() {
    this.matDialog.open(InputBoxDialogComponent, { data: { title: 'Authorization Code', valueName: 'Authorization Code', required: true, extraHTML: 'Authorization Code has been sent on your registered Email ID' } }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if ( res !== false) {
          this.verifyCode(res);
        }
        this.flagdisabled = false;
      });
  }

}
