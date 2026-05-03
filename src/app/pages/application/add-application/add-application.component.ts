import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'app/services/application.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ProgramService } from 'app/services/program.service';
import { Login } from 'app/models/login.model';
import { ToasterService } from 'angular2-toaster';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MatDialog } from '@angular/material/dialog';
import { SearchStudentComponent } from 'app/pages/search-student/search-student.component';


@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent implements OnInit, OnDestroy {

  studentId: number = 0;
  programid: number;
  institutionId: number = 0;

  email: string = '';
  flagDisabled: boolean;
  btnLabel: string = "Save";


  currentUser: Login;

  program: any;

  permission: number = 0;

  programInfo: any;

  genInfo: any;

  eduInfo: any;

  testScore: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  emergencyInfo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private authService: AuthenticationService,
    private programService: ProgramService,
    private toasterService: ToasterService,
    private matDialog: MatDialog
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    if (this.currentUser.RoleId === 3) {
      this.studentId = this.currentUser.RefId;
    }

    this.permission = this.authService.checkPermission(sitemap.Applications);
  }

  ngOnInit() {
    if (this.permission <= 0) {
      this.router.navigate(['/member/unauthorized']);
      return;
    }

    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      if (this.currentUser.RoleId != 3) {
        this.studentId = +param.get("studentid") | this.studentId;
        this.email = param.get('email');
      }
      this.programid = +param.get("programid") | 0;
      this.institutionId = +param.get("institutionid") | 0;
      this.resetForm();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  resetForm(isSelect?: boolean) {

    if (!isSelect) {
      this.programInfo = {
        ApplicationId: 0,
        ProgramId: this.programid,
        InstitutionId: this.institutionId,
        IntekId: 0,
        ApplicationStatus: -1
      }
    }

    this.genInfo = {
      ApplicationId: 0,
      StudentId: this.studentId,
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Gender: '',
      DateOfBirth: '',
      Addres: '',
      City: '',
      Province: '',
      Country: 0,
      Pincode: '',
      MobileNo: '',
      Email: this.email,
      MaritialStatus: '',
      Language: '',
      Citizenship: 0,
      PassportNo: '',
      App_Password: '',
      AgentId: this.currentUser.RoleId === 2 ? this.currentUser.RefId : 0,
      //AssignedTo: this.currentUser.RoleId===3 ? 0 : null ,
      AssignedTo: 0,
      MailingAddres: '',
      MailingCity: '',
      MailingProvince: '',
      MailingCountry: 0,
      MailingPincode: '',
      MailingAddressSame: false,
      EmergencyAddressSame: false

    };

    this.eduInfo =
    {
      ApplicationId: 0,
      CountryOfEducation: 0,
      HighestLevelOfEducation: 0,
      GradingScheme: 0,
      GradeAverage: '',
      GraduatedMostRecent: 0,
      EduYearEnd: '',
      EduYearStart: '',
    };
    this.testScore = {
      ApplicationId: 0,
      EnglishExamType: 0,
      EnglishExamDate: '',
      EnglishScoreL: '',
      EnglishScoreR: '',
      EnglishScoreW: '',
      EnglishScoreS: '',
      GREExamDate: '',
      GREScoreV: '',
      GREScoreQ: '',
      GREScoreW: '',
      GMATExamDate: '',
      GMATScoreA: '',
      GMATScoreI: '',
      GMATScoreQ: '',
      GMATScoreV: '',
      EnglishScoreOverall: '',
    };
    this.emergencyInfo = { ApplicationId: 0 }

    if (this.studentId != 0) {
      this.getStudent(isSelect);
    }

    if (this.programid != 0 && !this.program) {
      this.getProgramDetail(this.programid);
    }
  }

  onSubmit(data: any) {
    data.eduInfo = this.eduInfo;
    data.testScore = this.testScore;
    data.emergencyInfo = this.emergencyInfo;
    this.flagDisabled = true;

    if (data.genInfo.App_Password == undefined) {
      data.genInfo.App_Password = '';
    }
    this.applicationService.add(data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.toasterService.pop('success', 'Application applied successfully');
      this.flagDisabled = false;
      if (this.currentUser.UserId > 0) {
        this.router.navigate(["/member/application/view/" + +res]);
      }
      else {
        this.router.navigate(["home"]);
      }
    }, err => {

      this.flagDisabled = false;
    });
  }

  getStudent(isSelect?: boolean) {


    this.applicationService.getStudent(this.studentId, this.programid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      res.genInfo.StudentId = this.studentId;
      res.genInfo.ApplicationId = 0;
      if (!isSelect) {
        res.programInfo.InstitutionId = this.institutionId;
        res.programInfo.ProgramId = this.programid;
        res.programInfo.IntekId = 0;
        res.programInfo.isSubmited = 0;
        res.ApplicationStatus = -1;

        this.programInfo = res.programInfo;
      }

      this.genInfo = res.genInfo;
      this.eduInfo = res.eduInfo;
      this.testScore = res.testScore;
      //this.emergencyInfo = res.emergencyInfo;
    });
  }

  // getApplication() {
  //   this.applicationService.get(this.id).subscribe(res => {
  //     this.programInfo = res.programInfo;
  //     this.genInfo = res.genInfo;
  //     this.eduInfo = res.eduInfo;
  //     this.testScore = res.testScore;
  //     //this.replydata.StatusId = this.formdata.ApplicationStatus;
  //     this.getProgramDetail(this.programInfo.ProgramId);
  //   });
  // }

  getProgramDetail(programId: number) {
    this.programService.getdetail(programId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.program = res;
    });
  }



  showStudentSelect() {
    this.matDialog.open(SearchStudentComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        if (+res != +this.studentId) {
          this.studentId = +res;
          this.resetForm(true);
        }
        // this.router.navigate(["/member/application/apply/0/" +res+'/'+this.programid+'/'+this.institutionId]);
      }
    });
  }

}
