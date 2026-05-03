import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { appPattern, sitemap } from 'app/models/site-map.model';
import { CampaignActivityService } from 'app/services/campaign-activity.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import {  editorlist} from 'app/models/site-map.model';
import { TaskService } from 'app/services/task.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InstituteService } from 'app/services/institute.service';
import { ProgramService } from 'app/services/program.service';
import { InstitutionIntakeService } from 'app/services/institution-intake.service';
import { Input } from '@angular/core';
import { MSMAgentService } from 'app/services/msmagent.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';

@Component({
  selector: 'app-campaign-activity-add',
  templateUrl: './campaign-activity-add.component.html',
  styleUrls: ['./campaign-activity-add.component.scss']
})
export class CampaignActivityAddComponent implements OnInit, OnDestroy {

  formdata: any;
  btnLabel:String='Add';
  modelPattern=appPattern;
  typeFilter:any='';
  instituteFilter: any = '';
  agentFilter:any = '';
  institutionList: any[];
  programList: any[];
  agentList: any[];
  intakeList: any[];
  prgFilter:any='';
  intakeFilter:any='';
  permission:number=0;
  flagStatus :any= false;
  flagdisabled:boolean =false;
  activityTypeList:any =[];
  minActivitydate:any =  new Date(); 
  showfield: boolean;
  showagent: boolean;
  currentUser: Login;
  desError :any = false;

  // activityTypeList=enumToArray(campaignActivityType) ;
  popupVisible: boolean;
  items: any = Object.assign([], editorlist);
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private campaignActivityService: CampaignActivityService,
    private dialogRef: MatDialogRef<CampaignActivityAddComponent>,
    private taskService :TaskService,
    private instService:InstituteService,
    private programService: ProgramService,
    private institutionIntakeService :InstitutionIntakeService,
    private agentService: MSMAgentService,
    private authService: AuthenticationService,
    
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.showfield = data.showfield;
    this.showagent =  data.showagent,
    this.formdata = {
      ActivityId: data.ActivityId | 0,
      ParentId:data.ParentId,
      ParentType:data.ParentType,
      ActivityType:null,
      IntakeGroupId: null,
      ProgramId: null,
      ActivityResponse: '',
      InstitutionId: null,
      ActivityDescription:'',
      StartDate:'',
    }
   
    this.get();
    
    if(data.ActivityId)
    {
       this.btnLabel='Update';
    }
    this.permission = data.permission | 0;

   
    this.currentUser = authService.currentUserSubject.getValue();
  }
  

  ngOnInit() {
    this.items.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
  });
  this.getTaskTypelist();
  this.fillInstitution();
  this.fillAgent();
  if (this.permission === 0) {
    if (this.formdata.ParentType === 1) {
     this.permission = this.authService.checkPermission(sitemap.Campaign);
   }else if(this.formdata.ParentType === 6){
    this.permission = this.authService.checkPermission(sitemap.Students);
   }
     else if(this.formdata.ParentType === 9){
     this.permission = this.authService.checkPermission(sitemap.Marketing_Agent_Activity);
   }
 }
  }
  getTaskTypelist(){
    this.taskService.getTaskType().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.activityTypeList = res;
    });
  }
  

  save(form:NgForm) {

    if(form.invalid)
    {
      this.desError =true;
    // (this.formdata.ActivityDescription != "" ?  this.desError = false :  this.desError = true);
      return;
    }
    this.flagdisabled = true;
    if(this.formdata.ActivityId>0)
    {
      this.campaignActivityService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dialogRef.close(true);
      }, err =>{
        this.flagdisabled =false;
      });
    }
    else
    {
      this.campaignActivityService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dialogRef.close(true);
      },err =>{
        this.flagdisabled =false;
      });
    }
  }
  

  get()
  {
     if(this.formdata.ActivityId>0)
     {
        this.campaignActivityService.get(this.formdata.ActivityId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.formdata=res;
          this.fillProgram();
          this.fillIntake();
          this.fillAgent();
        })
     }
  }

  fillInstitution() {
    this.instService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.institutionList = res;
    })
  }

  fillProgram(reset?: boolean) { 
    if(reset){
      this.formdata.ProgramId=null;
      // this.formdata.ActivityResponse=null;
    }
    if (this.formdata.InstitutionId && this.formdata.InstitutionId > 0){
      this.programService.forDDL(this.formdata.InstitutionId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.programList = res;
      }); 
    }
  }

  OnprogramChange(reset?:boolean){
    if(reset)
    {
      this.formdata.IntakeGroupId=null;
    }
    if(this.flagStatus && this.formdata.ProgramId == 0){
      this.fillIntake(true);
    }
    if(this.formdata.ProgramId && this.formdata.ProgramId > 0){
          this.fillIntake(true);
       }
   this.flagStatus =true;
  }

  fillIntake(reset?: boolean) {
    if(reset){
      this.formdata.IntakeGroupId=null;
    }
      this.institutionIntakeService.ForReportFilter( this.formdata.InstitutionId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.intakeList = res;
        });
  }

  fillAgent() {
      this.agentService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.agentList = res;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

 
}
