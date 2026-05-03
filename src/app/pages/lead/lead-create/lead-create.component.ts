import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StudentService } from 'app/services/student.service';
import { Student } from 'app/models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-lead-create',
  templateUrl: './lead-create.component.html',
  styleUrls: ['./lead-create.component.scss']
})
export class LeadCreateComponent implements OnInit, OnDestroy {
  formdata: Student;

  @Input()
  id: number = 0;

  currentUser: Login;

  @Input()
  permission: number = 0;

  @Input()
  isProfile: number = 0;

  genInfo:any;

  eduInfo:any;

  testScore:any;

  emergencyInfo:any;


  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {

    this.currentUser = this.authService.currentUserSubject.value;
    if (this.isProfile === 0) {
      this.permission = this.authService.checkPermission(sitemap.Lead);
      if (this.permission <= 0) {
        this.router.navigate(['/member/unauthorized']);
        return;
      }
      this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
        this.id = +param.get("id") | 0;
        this.resetForm();
      });
    }
    else {
      this.resetForm();
    }
  }

  resetForm() {
    this.genInfo={
      StudentId:0,
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
      Email: '',
      MaritialStatus: '',
      Language: '',
      Citizenship: 0,
      PassportNo: '',
      AgentId:0,
      MailingAddres: '',
      MailingCity: '',
      MailingProvince: '',
      MailingCountry: 0,
      MailingPincode: '',
    };

    this.eduInfo =
    {
      StudentId: 0,
      CountryOfEducation: 0,
      HighestLevelOfEducation: 0,
      GradingScheme: 0,
      GradeAverage: '',
      GraduatedMostRecent: 0,
      EduYearEnd: '',
        EduYearStart: '',
    }
    this.testScore={
      StudentId: 0,
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
    },
    this.emergencyInfo={StudentId: this.id};
  }

  onSubmit(data: any) {
     data.eduInfo = this.eduInfo;
    data.testScore = this.testScore;
    data.emergencyInfo = this.emergencyInfo;

      this.studentService.add(data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.id = +res;
        this.toasterService.pop("success","Lead saved successfully");
        this.router.navigate(["member/leads/edit/" + this.id]);
      });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
