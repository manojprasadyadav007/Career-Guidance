import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentApplicationService } from 'app/services/agent-application.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { MSMAgentService } from 'app/services/msmagent.service';
import { InstituteService } from 'app/services/institute.service';
import { NgForm } from '@angular/forms';
import { SubTitleService } from 'app/services/sub-title.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
import { sitemap } from 'app/models/site-map.model';
import { MatDialog } from '@angular/material';
import { ReasoningDialogboxComponent } from 'app/utility/reasoning-dialogbox/reasoning-dialogbox.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { UploadService } from 'app/services/upload.service';

@Component({
  selector: 'app-add-agent-application',
  templateUrl: './add-agent-application.component.html',
  styleUrls: ['./add-agent-application.component.scss']
})
export class AddAgentApplicationComponent implements OnInit, OnDestroy {
  uploadDir = "AEFReferenceCheck";
  uploaddirSignature = "agent/application";
  institutionList: any[];
  countryList: any[];
  instFilter: any = '';
  formdata: any = { ApplicationId: 0, AgentId: 0, InstitutionId: 0, ApplicationStatus: -1, StatusRemark: '', FormValue: [], RegionOfMarketing: 0 , SignaturePath :''}
  agentId: number = 0;
  parentName = "";
  currentUser: Login;
  flagdisabled: boolean = false;
  currentAgent: any;

  uploadFile: File;
  filePath: string;
  cancelLink: string = '/member';
  remarks: any = "";
  institutionId: number = 0;
  permission: number = 0;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private agentApplicationService: AgentApplicationService,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService,
    private router: Router,
    private agentService: MSMAgentService,
    private institutionService: InstituteService,
    private subtitleService: SubTitleService,
    private mandatoryfieldCheckService: MandatoryfieldCheckService,
    private matDialog: MatDialog,
    private uploadService : UploadService

  ) {

    this.currentUser = this.authService.currentUserSubject.getValue();
    if (this.currentUser.RoleId === 2) {
      this.permission = 3;
    }
    // else if (this.currentUser.RoleType === 2) {
    //   this.permission = 3;
    // }
    else {
      this.permission = this.authService.checkPermission(sitemap.AgentEvaluationForm);
    }
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();

    if (this.currentUser.RoleId === 2) {
      this.agentId = this.currentUser.RefId;
      this.formdata.AgentId = this.agentId;
    }

    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.cancelLink = res['returnUrl'];
    });

    this.activatedRoute.paramMap
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata.ApplicationId = +res.get('id') | 0;
        this.institutionId = +res.get('instid') | 0;
        this.formdata.InstitutionId = this.institutionId;
        this.agentId = +res.get('agentid') | this.agentId;
        this.formdata.AgentId = this.agentId;
        this.fillInstitutionList();
        if (this.formdata.ApplicationId === 0 && this.agentId > 0) {
          this.getAgentProfile();
        }
        if (this.formdata.ApplicationId > 0 || this.formdata.InstitutionId > 0) {
          this.get();
        }
        if (this.agentId > 0) {
          this.getName();
        }
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  getName() {
    if (this.currentUser.RoleId != 2) {
      this.agentService.getName(this.agentId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.subtitleService.name.next(res);
        });
    }
  }

  apply(form: NgForm, isSubmit?: boolean) {

    if (isSubmit && form.invalid) {
      this.mandatoryfieldCheckService.setinvalidFields();
      // this.toasterService.pop('error','Application Form','Fill all field before submit');
      return;
    }
    this.flagdisabled = true;
    this.formdata.UserId = this.currentUser.UserId;

    if (this.formdata.ApplicationId > 0) {
      this.agentApplicationService.update(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.flagdisabled = false;
          this.formdata.ApplicationId = +res;
          if (isSubmit) {
            this.updateStatus(0);
          }
          else {
            this.toasterService.pop('success','Institution application updated successfully');
            this.get();
          }
        });
    }
    else {
      this.agentApplicationService.add(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.flagdisabled = false;
          this.formdata.ApplicationId = +res;
          if (isSubmit) {
            this.updateStatus(0);
          }
          else {
            this.toasterService.pop('success','Institution application saved successfully');
            this.router.navigate(['/member/application-for-institution/edit-application/' + this.formdata.ApplicationId], { queryParams: { returnUrl: this.cancelLink } });
          }
        });
    }
  }
  onFileChange(value: File){
    this.uploadFile = value;
    if (this.uploadFile) {
      this.flagdisabled = true;
    this.uploadService.uploadFileWithoutProgress(this.uploaddirSignature, this.uploadFile).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formdata.SignaturePath = res[0];
      this.flagdisabled = false;
     // this.formdata.Siguration =undefined
    },err => {
      this.flagdisabled = false;
      })
    }
  }


  fillInstitutionList() {
    // if(this.agentId>0)
    // {
    //   this.agentInstitutionService.forDDL(this.agentId)
    //.pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    //     this.institutionList = res;
    //   });
    // }

    // fill all institution as per discussion with kapil sir on 07-05
    if (this.agentId > 0) {

      let applicationId = 0;

      if (this.formdata && this.formdata.ApplicationId) {
        applicationId = this.formdata.ApplicationId;
      }

      this.institutionService.forAgentEvolutionForm(this.agentId, applicationId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.institutionList = res;
        });
    }
  }

  get() {
    this.agentApplicationService.get(this.formdata.ApplicationId, this.formdata.InstitutionId, this.agentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res.countryList;
      if (res.AgentId > 0) {

        this.agentId = res.AgentId;
        this.getName();
        this.fillInstitutionList();
      }
      this.formdata.InstitutionId = res.InstitutionId;
      this.formdata.ApplicationStatus = res.ApplicationStatus;
      this.formdata.StatusRemark = res.StatusRemark;
      this.formdata.SignaturePath = res.SignaturePath;

        // make all field required
        // res.FormValue.forEach(element => {
        //     if(element.ControlType.toLowerCase()==='text' || element.ControlType.toLowerCase()==='multiline' 
        //     || element.ControlType.toLowerCase()==='date'  || element.ControlType.toLowerCase()==='number' 
        //     ||  element.ControlType.toLowerCase()==='radio'  ||  element.ControlType.toLowerCase()==='select' )
        //     {
        //        element.Data.validation.required.value=true;
        //     }
        // });

        this.formdata.FormValue = res.FormValue;
      //this.formdata.RegionOfMarketing = res.RegionOfMarketing;
    });
  }

  getAgentProfile() {
    this.agentService.getDetail(this.agentId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.currentAgent = res;
      });
  }

  updateStatus(status: number) {
    if (status === 2) {
      this.matDialog.open(ReasoningDialogboxComponent, { data: '' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.remarks = res.data;
          this.updateStatusService(status);
        }
      });
    } else {
      this.remarks = '';
      this.updateStatusService(status);
    }

  }
  updateStatusService(status) {
    this.flagdisabled = true;
    this.agentApplicationService.status(
      {
        ApplicationId: this.formdata.ApplicationId,
        StatusId: status,
        Remark: this.remarks,
        UserId: this.currentUser.UserId
      })
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Institution application updated successfully');
        this.flagdisabled = false;
        // this.location.back();
        this.router.navigateByUrl(this.cancelLink);
      }, err => {
        this.flagdisabled = false;
      });
  }

  back() {
    this.router.navigateByUrl(this.cancelLink);
  }

  onInstChange()
  {
    let inst= this.institutionList.find(d=>d.InstitutionId===this.formdata.InstitutionId); 

    if(inst)
    {
      if(inst.RegionOfMarketing.toString().toLowerCase()==="outside")
        {
           this.matDialog.open(ConfirmBoxComponent,{data:{content: ( "Currently, Institution is not providing programs for " + (this.currentUser.RoleId===2 ? "your region.":"this Agent region.")),yesLabel:"Continue",noLabel:"Cancel",icon:"info"}}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
              if(res)
              {
                this.get();
              }
              else
              {
                this.formdata.InstitutionId = null;
                this.formdata.FormValue = null;
              }
           });
        }
        else
        {
          this.get();
        }
    }

  }

}
