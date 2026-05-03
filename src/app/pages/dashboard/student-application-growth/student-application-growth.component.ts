import { Component, OnInit,   OnDestroy } from '@angular/core';
import { InstitutionIntakeService } from 'app/services/institution-intake.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DashboardService } from 'app/services/dashboard.service';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { MatDialog } from '@angular/material';
import {  StudentGrowthDialogComponent}  from  '../student-growth-dialog/student-growth-dialog.component';
import { InstituteService } from 'app/services/institute.service';
import  { SentenceCasePipe  } from 'app/custom-pipes/sentence-case/sentence-case.pipe';
@Component({
  selector: 'app-student-application-growth',
  templateUrl: './student-application-growth.component.html',
  styleUrls: ['./student-application-growth.component.scss'],
})
export class StudentApplicationGrowthComponent implements OnInit, OnDestroy {


  studentAppIntakList: any;
  currentUser: Login;
  private onDestroy$: Subject<void> = new Subject<void>();
  enrollmentGrowthFilter: any = {
    IntakeId: 0, ApplicationType: 0 , InstitutionId:0
  };
  grossProductData: any = [];
  studentApplicationFilter: any = '';
  studentInstitutionFilter:any='';
  //InstitutionId:any;
  instList:any =[];
  instCountry:number = 0;

  constructor(private dashboardService: DashboardService,
    private institutionIntakeService: InstitutionIntakeService,
    private authService: AuthenticationService,
    private matDialog : MatDialog,
    private InstService : InstituteService ,
    private SentenceCasePipe : SentenceCasePipe ) {

    this.currentUser = this.authService.currentUserSubject.getValue();
  }

  ngOnInit() {
    // this.institutionIntakeService.ForDashboardFilter().subscribe(item => {
    //   this.studentAppIntakList = item;
    //   this.enrollmentGrowthFilter.IntakeId = item[0].IntakeGroupId;
    //   this.studentAppEnrollementGrowth();
    // })
  
    this.dropdownservices();
  }

  dropdownservices() {
    if (this.currentUser.RoleType != 2) {
      this.InstService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.instList = res;
       // this.InstitutionId = 0;
      });
    }
    if (this.currentUser.RoleType === 2) {
     // this.InstitutionId = this.currentUser.RefId;
      this.enrollmentGrowthFilter.InstitutionId =  this.currentUser.RefId;
      this.InstitutionChange( this.enrollmentGrowthFilter.InstitutionId)
    }
  }
  studentAppEnrollementGrowth() {
    this.dashboardService.studentApplicationandEnrollmentGrowth(this.enrollmentGrowthFilter.IntakeId, this.enrollmentGrowthFilter.ApplicationType ,  this.enrollmentGrowthFilter.InstitutionId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.instCountry = 0;
        if(res.length>0)
        {
          this.instCountry = res[0].instCountry | 0;
        }
       // console.log(instCountry);
        if(this.instCountry==231)
        {
          this.grossProductData = [
            { "TotalApplicationsenttillnow": 0, "label_name": 'Total Applications sent till now', name: "Total applications sent till now" },
            { "OfferLetterIssued": 0, "label_name": 'Offer Letter Issued', name: "Offer letter issued" },
            //{ "IELTSCompliantGeneral": 0, "IELTSCompliantSDS": 0, name: "IELTS Compliant" },
            { "AccommodationCountTotal": 0, "label_name": 'Enrollment and housing/Deposit fees', name: "Enrollment and housing/deposit fees" },
           { "I20CountTotal": 0, "label_name": 'I20 Fees', name: "I20 fees" },
            { "SEVISCountTotal": 0, "label_name": 'SEVIS Fees', name: "SEVIS fees" },
            { "TuitionDepositCountGeneral": 0,"label_name": 'Tuition Deposit Count General', name: "Tuition Deposit Count" },
            { "StudyPermitStatusApproved": 0, "label_name": 'Transferred/drop Out', "StudyPermitStatusRefused": 0, name: "Study permit status" },
            { "TransferredDropOut": 0, "label_name": 'Transferred/drop Out', name: "Transferred/Drop out" },
            { "Deferredtonextintake": 0, "label_name": 'Deferred to next intake', name: 'Deferred to next intake' },
            { "EnrolledStudents": 0, "label_name": 'Enrolled Students', name: "Enrolled students" },
          ]
        }
        else{
          this.grossProductData = [
            { "TotalApplicationsenttillnow": null, "label_name": 'Total Applications sent till now', name: "Total applications sent till now" },
            { "OfferLetterIssued": null, "label_name": 'Offer Letter Issued', name: "Offer letter issued" },
           // { "IELTSCompliantGeneral": null, "IELTSCompliantSDS": null, name: "IELTS Compliant" },
           { "TuitionDepositCountGeneral": null,"label_name": 'Tuition Deposit Count General', name: "Tuition Deposit Count" },
            {"TuitionDepositCountSDS":null,"label_name":'Tuition deposit count SDS',name:"Tuition deposit count SDS"},
            { "TuitionDepositCountTotal": null,"label_name":'Tuition deposit count total',name: "Tuition deposit count" },
            { "AccommodationCountTotal": null, "label_name": 'Enrollment and housing/Deposit fees', name: "Enrollment and housing/deposit fees" },
            { "I20CountTotal": null, "label_name": 'I20', name: "I20 fees" },
            { "SEVISCountTotal": null, "label_name": 'SEVIS Fees', name: "SEVIS fees" },
             { "StudyPermitStatusApproved": 0, "label_name": 'Transferred/dropout', "StudyPermitStatusRefused": 0, name: "Study permit status" },
            { "TransferredDropOut": 0, "label_name": 'Transferred/dropout', name: "Transferred/Drop out" },
            { "Deferredtonextintake": 0, "label_name": 'Deferred to next intake', name: 'Deferred to next intake' },
            { "EnrolledStudents": 0, "label_name": 'Enrolled Students', name: "Enrolled students" },
          ]
        }
        
        
        this.grossProductData.forEach(element => {
          for (let [key, value] of Object.entries(res[0])) {
            if (element.hasOwnProperty(key)) {
              element[key] = value != null ? value : 0;
            }
          }
        });

        //console.log(this.grossProductData);
      });
  }
  InstitutionChange(data){
   this.grossProductData = [];
    this.institutionIntakeService.ForDashboardFilter(data).subscribe(item => {
      this.studentAppIntakList = item;
      if(this.currentUser.RoleType === 2){
         this.enrollmentGrowthFilter.IntakeId = item[0].IntakeGroupId;
         this.studentAppEnrollementGrowth();
      }
     
    })

  }
  customizeLabel(arg) {
    return {
      visible: false,
      backgroundColor: "#d3d3d3",
      customizeText: function (e: any) {
        if (e.seriesName.toLowerCase().includes('series')) {
          return e.valueText;
        } else {
          return e.seriesName + ':' + e.valueText;
        }
      }
    }
  };


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  onPointClick(item) {
   let serviceName ;
   let subtitle = '';
   let title = '';
   console.log(item.target);
if(item.target.argument == 'Total applications sent till now'){
    serviceName = 'applicationcountdetail';
    title = 'Total applications sent till now';
  }else if(item.target.argument == 'Offer letter issued'){
    serviceName  = 'offerletter';
    title = 'Offer letter issued';
  }else if(item.target.argument =='IELTS compliant'){
    title = "IELTS compliant";
   //  return ;
  }else if(item.target.argument  ==  "Tuition deposit count"){
    serviceName = 'tdcount';
    title  = item.target._options.name;
  }else if(item.target.argument == 'Study permit status'){
      if(item.target._options.name == 'Study permit approved'){
            serviceName = 'studypermitapproval';
            title = 'Study permit approved';
      }else if(item.target._options.name == "Study permit refused"){
        serviceName = 'studypermitrefusal';
        title = "Study permit refused";
      }
  }else if(item.target.argument == 'Transferred/Drop out'){
      serviceName = 'dropoutcountdetail';
      title="Transferred/Dropout";
  }else if(item.target.argument  == 'Deferred to next intake'){
      serviceName = 'deferredcountdetail';
      title= 'Deferred to next intake'
  }else if(item.target.argument == 'I20 fees'){
      serviceName = 'i20countdetails';
      title ='I20';
  }else if(item.target.argument == 'SEVIS fees'){
    serviceName = 'seviscountdetails';
    title = 'SEVIS fees';
  }else if(item.target.argument == 'Enrollment and housing/deposit fees'){
    serviceName = 'accommodationcountdetails';
    title= 'Enrollment and Housing/Deposit fees';

  }else if(item.target.argument =='Enrolled students'){
    serviceName = 'enrolledstudents';
    title = 'Enrolled students';
    //return;
 }
  
  this.StudentGrowthDialogService(serviceName , title );
  }

  StudentGrowthDialogService(serviceName , title ){
    //let text = subtitle.toLowerCase();
    //let text  = 
    this.matDialog.open(StudentGrowthDialogComponent, { data: { title:title  ,  service: serviceName, institution: this.enrollmentGrowthFilter.institutionId,  intakeID: this.enrollmentGrowthFilter.IntakeId , ApplicationType: this.enrollmentGrowthFilter.ApplicationType} }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {});
  }

  customizeTooltip(arg) {
    if(!arg||arg==undefined){console.log(true)}
    return { 
      text: arg.seriesName.toLowerCase().includes('series')?arg.value:arg.seriesName + ":" +arg.value }
  }

}
