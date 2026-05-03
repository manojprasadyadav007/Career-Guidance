import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ApplicationService } from 'app/services/application.service';
import { ApplicationCCService } from 'app/services/application-cc.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { MiscService } from 'app/services/misc.service';
import { Login } from 'app/models/login.model';
import { SubTitleService } from 'app/services/sub-title.service';
import { ProgramFeeService } from 'app/services/program-fee.service';
import { ActivityService } from 'app/services/activity.service';
import { InstituteService } from 'app/services/institute.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import * as $ from 'jquery';
import Swal from 'sweetalert2'
import { InputBoxDialogComponent } from 'app/utility/input-box-dialog/input-box-dialog.component';
import { appPattern } from '../../../models/site-map.model';
import { EncryptionService } from 'app/services/encryption.service';
import { environment } from 'environments/environment';

import * as CryptoJS from 'crypto-js';
import { MatOptionSelectionChange } from '@angular/material';
import { PrintComponent } from 'app/pages/print/print.component';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-display-application',
  templateUrl: './display-application.component.html',
  styleUrls: ['./display-application.component.scss']
})
export class DisplayApplicationComponent implements OnInit, OnDestroy {

  formdata: any;
  showIntek:boolean=false;
  editDeffered: boolean = false;
  id: number;
  parentName: string = 'Application';
  ccInfo: any;
  otherInfo: any;
  showIntekDetails:boolean=true;
  intekList:any[]=[];
  permission: number;
  countryId:number;
  printavail: string = '';
  show_label:boolean=true;
  currentUser: Login;
  programId:number;
  reviewList:any = [];
  feeList: any[];
  statusFilter: any = '';
  flowList: any[] = [];
  flowBar: any[] = [];
  flowBarActiveIndex: number = -1;
  //hideStatus: any[] = [];
  statusList: any[];
  pendingDocumentCount: number = 1000;
  enrollmentData: any = { EnrollmentNo: '' };
  applicationStatusListForDropDown: any[];
  applicationStatusList: any[];
  applicationStatus: string = '';
  reviewFilter:any ='';
  queryStatusList: any[];
  shortFlowBar: any[] = [];
  shortFlowBarActiveIndex: number = -1;
  RemarkIntake:any ;
  statusReplyData: any = { ActivityType: 5, Remark: '', StatusId: null, Priority: -1 };
  pendingDocumentList: String[] = [];

  key = CryptoJS.enc.Utf8.parse('7061737323313233');
  iv = CryptoJS.enc.Utf8.parse('7061737323313233');
  isEdit: boolean;  

  modelPattern = appPattern;
  
  @ViewChild("inputEnroll", { static: false }) inputEnroll: ElementRef;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private applicationService: ApplicationService,
    private programIntekService: ProgramIntekService,
    private activatedRoute: ActivatedRoute,
    private applicationCCService: ApplicationCCService,
    authService: AuthenticationService,
    private subTitleService: SubTitleService,
    private programFeeService: ProgramFeeService,
    private activityService: ActivityService,
    private institutionService: InstituteService,
    private toasterService: ToasterService,
    private matDialog: MatDialog,
    private miscService: MiscService,
    private encryptionService: EncryptionService) {
    this.currentUser = authService.currentUserSubject.getValue();
    this.permission = authService.checkPermission(sitemap.Applications);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.id = +param.get("id") | 0;
      this.getApplication();
      this.getCCInfo();
      this.listStatusActivity();
      this.getApplicationFlow();
    });
    this.listQueryStatus();
    this.reviewStatusList();    

  }

  reviewStatusList(){
    this.applicationService.reviewStatusList().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    if(res){
       this.reviewList = res;
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  checkCondition(pattern) {

    if( pattern ) {
      return true
    }
    if(!this.enrollmentData.EnrollmentNo) {
     return true;
    }
  }

  onEditEnrollBtnClick(event) {
    event.stopPropagation();
    this.isEdit = false;
    setTimeout(() => {
      this.inputEnroll.nativeElement.focus();
    }, 100);
  }

  getApplication() {
    this.applicationService.view(this.id)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res.genInfo.EnrollmentNo) this.isEdit = true;         
        else this.isEdit = false;  
        this.formdata = res;
        this.programId=res.programInfo.ProgramId;
        this.countryId=res.genInfo.Citizenship;
        this.fillIntek(false);
        this.formdata.deferredInfo=res.deferredInfo;
        this.enrollmentData.EnrollmentNo = res.genInfo.EnrollmentNo;       
        this.statusReplyData.StatusId = res.programInfo.ApplicationStatus;
        this.updateSubTitle();
        if (!this.otherInfo) {
          this.getOtherInfo();
        }
        this.listFeeType();
        this.listStatuslist();
        this.getFlowBar();
        this.getPendingDocumentCount();
        this.isPrintAvail();
      });
  }

  getCCInfo() {
    this.applicationCCService.get(this.id)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.ccInfo = res; 
          this.ccInfo.CCNo =  this.encryptionService.get(environment.creditCardKey, res.CCNo);
          this.ccInfo.CCCode = this.encryptionService.get(environment.creditCardKey, res.CCCode);
        }
      });
  }

  getOtherInfo() {
    this.applicationService.getOtherInfo(this.id, this.formdata.programInfo.InstitutionId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.otherInfo = res;
      });
  }

  updateSubTitle() {
    this.subTitleService.name.next(this.formdata.genInfo.ApplicationId + ' / ' + this.formdata.genInfo.FirstName + ' ' + this.formdata.genInfo.LastName + ' / ' + this.formdata.programInfo.IntakeName + ' / ' + this.formdata.programInfo.ApplicationStatusName);
  }

  listFeeType() {
    this.programFeeService.forApplication({ IntakeId: this.formdata.programInfo.IntekId, Nationality: this.formdata.genInfo.Citizenship, ApplicationId: this.id }).subscribe(res => {
      this.feeList = res;
    });
  }

  onUpdate(event: any) {
    if (event.toString().toLowerCase() === 'ccinfo') {
      this.getCCInfo();
    }
    else {
      this.getApplication();
      if (event.toString().toLowerCase() === 'programinfo') {
        this.listStatusActivity();
        this.getApplicationFlow();
        this.isPrintAvail();
        this.updateStatusDropDown(this.applicationStatusListForDropDown);
      }
    }
  }

  ccInfoUpdate(event) {
    this.ccInfo = event;
  }

  getApplicationFlow() {
    this.flowList = [];
    this.flowBar = [];
    this.applicationService.statusFlow(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.flowList = res;
      this.getFlowBar();
    });
  }

  getFlowBar() {
    this.flowBar = [];
    this.shortFlowBar = [];


    if (!this.statusList || !this.flowList) {
      return;
    }

    if (!this.formdata || !this.formdata.programInfo.ApplicationStatus) {
      return;
    }
    // check last null entry in activity
    let filteredStatusList: any[] = [];
    for (let i = 0; i < this.statusList.length; i++) {
      if (this.statusList[i].StatusId === null) {
        break;
      }
      filteredStatusList.push(this.statusList[i]);
    }

    for (var i = 0; i < filteredStatusList.length; i++) {
      // get status id
      var status = filteredStatusList[i].StatusId;

      // find status in all flow
      for (var j = 0; j < this.flowList.length; j++) {
        // check if status id exists in current flow 
        if (this.flowList[j].data.findIndex(d => d.value === status) >= 0) {
          var dataFound = false;

          //check current flow status exists in flow bar return true if found
          this.flowBar.forEach(element => {
            if (this.flowList[j].data.findIndex(d => d.value === element.value) >= 0) {
              dataFound = true;
            }
          });
          //check if statusid not exists in flowbar
          if (!dataFound) {
            var index = this.flowList[j].data.findIndex(d => d.value === status);
            if (i === 0) {
              // add all step of flow if status is current application status
              this.flowBar = this.flowList[j].data.concat(this.flowBar);
              // this.hideStatus = this.flowList[j].data.filter((d, i) => { return i < index }).concat(this.hideStatus)
            }
            else {
              // add start to upto status from flow 
              this.flowBar = this.flowList[j].data.filter((d, i) => { return i <= index }).concat(this.flowBar);
              //  this.hideStatus = this.flowList[j].data.concat(this.hideStatus);
            }
          }
          break;
        }
      }
    }
    if (this.flowBar.length === 0 && this.flowList.length > 0) {
      this.flowBar = this.flowList[0].data;
    }
    this.getFlowBarActiveIndex();

    if (this.flowBar.length > 0) {
      if (this.flowBarActiveIndex > -1) {
        //assign previous
        if (this.flowBarActiveIndex > 0) {
          this.shortFlowBar.push(this.flowBar[this.flowBarActiveIndex - 1]);
        }
        //assign current
        this.shortFlowBar.push(this.flowBar[this.flowBarActiveIndex]);
        // assign next if available
        if (this.flowBar.length >= this.flowBarActiveIndex + 2) {
          this.shortFlowBar.push(this.flowBar[this.flowBarActiveIndex + 1]);
        }
      }
      else {
        this.shortFlowBar.push(this.flowBar[0]);
      }
      if (this.formdata && this.shortFlowBar) {
        this.shortFlowBarActiveIndex = this.shortFlowBar.findIndex(d => d.value === this.formdata.programInfo.ApplicationStatus);
      }

    }
  }

  getFlowBarActiveIndex() {
    this.flowBarActiveIndex = -1;
    if (this.formdata && this.flowBar && this.flowBar.length > 0) {
      this.flowBarActiveIndex = this.flowBar.findIndex(d => d.value === this.formdata.programInfo.ApplicationStatus);
    }
  }

  // isStatusUsed(value: number) {
  //   try {
  //     return this.hideStatus.findIndex(d => d.value === value) >= 0;
  //   }
  //   catch (e) {
  //     return false;
  //   }
  // }



  updateEnrollmentNo() {
    this.applicationService.enrollmentNoUpdate(this.id, this.enrollmentData.EnrollmentNo).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.isEdit = true;   
      this.toasterService.pop('success','Application studentId updated successfully');
    });
  }

  deleteEnrollmentNo() {   
    this.applicationService.enrollmentNoUpdate(this.id, '').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.enrollmentData.EnrollmentNo = '';
      this.isEdit = false; 
      this.toasterService.pop('success', 'Application studentId deleted successfully');
    });
  }

  submitToInstitute() {
    if(!this.formdata.programInfo.ConditionalApplication){
      if (this.pendingDocumentCount > 0) {
        let pendingDoc = '';
        if (this.pendingDocumentList && this.pendingDocumentList.length > 0) {
          pendingDoc = ", " + this.pendingDocumentList.toString() + " is pending";
        }
        this.toasterService.pop('error', 'Application upload all required documents before submit' + pendingDoc);
  
        Swal.fire({
          icon: 'error',
          title: 'Document missing',
          text: 'Upload all required documents before submit' + pendingDoc,
        });
  
        return;
      }

    }

    if (!this.formdata.programInfo || !this.formdata.programInfo.termsAccepted || this.formdata.programInfo.termsAccepted === 0) {
      // this.toasterService.pop('error', 'Application', 'Terms and conditions not accepted by student');
      Swal.fire({
        icon: 'error',
        title: 'Terms and conditions',
        text: 'Terms and conditions not accepted by student'
      });
      return;
    }

    if (!this.formdata.eduInfo || !this.formdata.eduInfo.HighestLevelOfEducationName || this.formdata.eduInfo.HighestLevelOfEducationName === '') {
      //this.toasterService.pop('error','Application','Education information missing');
      Swal.fire({
        icon: 'error',
        title: 'Education',
        text: 'Education information missing'
      });
      return;
    }

    if (!this.formdata.testScore ||
      (!this.formdata.testScore.EnglishExamName || this.formdata.testScore.EnglishExamName === '')
      &&
      (!this.formdata.testScore.GMATExam || this.formdata.testScore.GMATExam === 0)
    ) {
      // this.toasterService.pop('error','Application','Test score missing');

      Swal.fire({
        icon: 'error',
        title: 'Test score',
        text: 'Test score information missing'
      });

      return;
    }

    this.matDialog.open(ConfirmBoxComponent, { data: { content: ' Are you sure submit this application to institute?' } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.applicationService.submitToInstitute(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
          this.formdata.programInfo.isSubmitedToInstitute = 1;
          this.toasterService.pop('success', 'Application submited successfully');
        });
      }
    });
  }
  listQueryStatus() {
    this.miscService.statuslist(1, this.currentUser.RoleId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.queryStatusList = res;
      //this.getStatusName();
    });
  }

  listStatusActivity() {
    this.activityService.list(5, this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.statusList = res;
      this.getFlowBar();
    })
  }

  listStatuslist() {
    this.institutionService.applicationStatus(this.formdata.programInfo.InstitutionId, this.formdata.genInfo.Citizenship)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.applicationStatusList = res;
        this.getStatusName();
      });

    this.institutionService.applicationStatusForDropDown(this.formdata.programInfo.InstitutionId, this.formdata.genInfo.Citizenship).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.updateStatusDropDown(res);
    });
  }

  updateStatusDropDown(data: any[]) {
    if (this.formdata.programInfo.ApplicationStatus != null) {

      let statusFoundInFlow: boolean = false;

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].child.length; j++) {
          if (data[i].child[j].value === this.formdata.programInfo.ApplicationStatus) {
            statusFoundInFlow = true;
            break;
          }
        }
        if (statusFoundInFlow) {
          break;
        }
      }

      if (statusFoundInFlow) {
        let statusFound: boolean = false;

        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].child.length; j++) {
            if (data[i].child[j].value === this.formdata.programInfo.ApplicationStatus) {
              data[i].child[j].current = true;
              statusFound = true;
              break;
            }
            else {
              data[i].child[j].current = false;
              data[i].child[j].used = true;
            }
          }
          if (statusFound) {
            break;
          }
        }
      }
    }

    data.forEach(value => {
      if (value.child.length === value.child.filter(d => d.used).length) {
        value.used = true;
      }
    });

    this.applicationStatusListForDropDown = data;
  }

  getStatusName() {
    try {
      this.applicationStatus = this.applicationStatusList.filter(d => +d.value === +this.formdata.programInfo.ApplicationStatus)[0].text;
    }
    catch (e) {
      //this.applicationStatus  = e.message;
    }
  }

  func() {
    return this.editDeffered ? "Close" : "Edit"
  }


  editDefferedDetail() {
   
    if (!this.editDeffered) {
      this.show_label=false;
      this.editDeffered = true;
    }
    else {
      this.show_label=true;
      this.editDeffered = false;
    }
  }


  onStatusReply($event ) {

    var statusId = $event.value;
    var selectedLabel = $event.source.selected.group.label;
   
     this.applicationStatusListForDropDown.forEach((x) =>{ 
        if (x.title === selectedLabel) {
           x.child.forEach((ele)=>{
              if( ele.value == statusId)
            this.RemarkIntake = ele.OutCome; 
           })
         }
    });
    this.matDialog.open(InputBoxDialogComponent, { data: { title: 'Remark', valueName: 'Remark', required: false , Status: this.RemarkIntake , programID: this.formdata.programInfo.ProgramId , intakeId: this.formdata.programInfo.IntekId  } }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if ( res !== false) {
          this.statusReplyData.ApplicationId = this.id;
          this.statusReplyData.Remark = res.inputText;
          this.statusReplyData.IntekId = res.IntakeName;
          this.statusReplyData.StatusId = statusId;
          this.applicationService.statusUpdate(this.statusReplyData)
            .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              this.toasterService.pop('success', 'Application status changed successfully');
              this.statusReplyData.Remark = '';

              this.formdata.programInfo.ApplicationStatus = statusId;
              this.getStatusName();
              this.formdata.programInfo.ApplicationStatusName = this.applicationStatus;
              this.listStatusActivity();

              this.updateStatusDropDown(this.applicationStatusListForDropDown);
              this.getFlowBar();

            });


        }
      });


  }


  submit() {
    if(!this.formdata.programInfo.ConditionalApplication){
      if (this.pendingDocumentCount > 0) {
        let pendingDoc = '';
        if (this.pendingDocumentList && this.pendingDocumentList.length > 0) {
          pendingDoc = ", " + this.pendingDocumentList.toString() + " is pending";
        }
        //this.toasterService.pop('error','Application','Upload all required documents before submit'+pendingDoc);
  
        Swal.fire({
          icon: 'error',
          title: 'Document missing',
          text: 'Upload all required documents before submit' + pendingDoc,
        });
  
  
        return;
      }
    }


    if (!this.formdata.programInfo || !this.formdata.programInfo.termsAccepted || this.formdata.programInfo.termsAccepted === 0) {
      // this.toasterService.pop('error','Application','Terms and conditions not accepted by student');

      Swal.fire({
        icon: 'error',
        title: 'Terms and conditions',
        text: 'Terms and conditions not accepted by student',
      });


      return;
    }

    this.matDialog.open(ConfirmBoxComponent, { data: { content: ' After submission you can\'t change any information in this application, make sure all information is correct and verified !' } }).afterClosed().subscribe(res => {
      if (res) {
        this.applicationService.submit(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
          this.formdata.programInfo.isSubmited = 1;
          this.toasterService.pop('success', 'Application submited successfully');

          $("#btnPrint")[0].click();

        });
      }
    });
  }

  getPendingDocumentCount() {
    this.pendingDocumentCount = 1000;
    this.applicationService.pendingDocumentCount(this.id)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.pendingDocumentCount = res;
      });
  }

  updateReviewStatus() {
    this.applicationService.reviewStatusUpdate(this.id, this.formdata.programInfo.ReviewStatus)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Application review status changed successfully');
      });
  }

  isPrintAvail(){
      this.applicationService.isPrintAvail(this.formdata.programInfo.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {  
          this.printavail = res;
      });
  }


  printApplication(id) {
    this.matDialog.open(PrintComponent, {
      data: {
        permission:this.permission,
        applicationId: id,
        title: 'Application Form'
      } , width: '95%',  height: '95%'
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }


  fillIntek(reset: boolean) {
        this.programIntekService.ListForDeferApplication(this.id)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.intekList = res;
          });
      }

      onChange(event) {
        // can't event.preventDefault();
        if(event.checked)
        {
          this.showIntek=true;
        }
        else{
          this.showIntek=false;
          this.formdata.deferredInfo.NewIntekId=null;
          this.formdata.deferredInfo.NewIntekId.setError({'required': null});
          this.formdata.deferredInfo.NewIntekId.setError({'pattern': null});
        }
      }

      editGenInfo()
      {
        this.show_label=false;
      }

      onIntakeChange()
      {

      }

      updateDeferred(form?: NgModel){
      if (form.invalid) {
        return;
      }
        this.applicationService.UpdateDeferred(this.id,this.formdata.deferredInfo.NewIntekId,this.formdata.deferredInfo.IsDeferred)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success','Application deferred updated successfully');
          this.getApplication();     
        });
      }
    
}
