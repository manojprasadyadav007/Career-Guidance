import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { RequirementService } from 'app/services/requirement.service';
import { AddRequirementComponent } from '../add-requirement/add-requirement.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AddEnglishRequirementComponent } from '../add-english-requirement/add-english-requirement.component';
import { AddSubjectRequirementComponent } from '../add-subject-requirement/add-subject-requirement.component';
import { AddAdditionalRequirementComponent } from '../add-additional-requirement/add-additional-requirement.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-requirement',
  templateUrl: './show-requirement.component.html',
  styleUrls: ['./show-requirement.component.scss']
})
export class ShowRequirementComponent implements OnInit , OnDestroy,OnChanges {

  gridMessage: string = 'No data';
  dataList:any[];

  columns:any[];

    showFilterRow:boolean=false;

  @Input()
  programId: number = 0;

  @Input()
  title: '';

  @Input()
  parentName: '';

  @Input()
  reqTypeId: number = 0;

  @Input()
  permission: number = 0;

  reqTypeName: string;

   @Input()
  requirementSubjectInfo:any='';

  @Input()
  institutionId: number = 0;

  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private requirementService: RequirementService,
    private matDialog: MatDialog,
    authService : AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService
    ) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
    if (+this.reqTypeId === 1) {
      this.reqTypeName = "English"
      // this.columnToDisplay = ['Region', 'Name', 'ScoreL', 'ScoreR', 'ScoreW', 'ScoreS', 'Score', 'Action'];
     this.columns=[
        { dataField:'Region', title:'Region', type:'', format:'' },
        { dataField:'ReqName', title:'Name', type:'', format:'' },
        { dataField:'ScoreL', title:'L', type:'', format:'' },
        { dataField:'ScoreR', title:'R', type:'', format:'' },
        { dataField:'ScoreW', title:'W', type:'', format:'' },
        { dataField:'ScoreS', title:'S', type:'', format:'' },
        { dataField:'Score', title:'Overall', type:'', format:'' },
      ];
    }
    else if (+this.reqTypeId === 2) {
      this.reqTypeName = "Subjects";
      this.columns =[
        { dataField:'Region', title:'Region', type:'', format:'' },
        { dataField:'ReqName', title:'Subject', type:'', format:'' },
        { dataField:'Grade', title:'Grade', type:'', format:'' },
        { dataField:'GradeScheme', title:'Grade Scheme', type:'', format:'' },
        { dataField:'Score', title:'Score', type:'', format:'' },
        { dataField:'BoardName', title:'Board', type:'', format:'' },
        { dataField:'ProvinceName', title:'Province', type:'', format:'' },
      ];
     // this.columnToDisplay = ['Region', 'Name', 'Grade','GradeScheme', 'Score','Board','Province', 'Action'];
    }
    else if (+this.reqTypeId === 3) {
      this.reqTypeName = "Academic";
      this.columns =[
        { dataField:'Region', title:'Region', type:'', format:'' },
        { dataField:'ReqName', title:'Academics', type:'', format:'' },
        { dataField:'GradeScheme', title:'Grade Scheme', type:'', format:'' },
        { dataField:'Score', title:'Score', type:'', format:'' },
      ];
    //  this.columnToDisplay = ['Region', 'Name', 'GradeScheme', 'Score', 'Action'];
    }
    else {
      this.reqTypeName = "Additional"
     // this.columnToDisplay = ['Region', 'Name','Action'];
     this.columns =[
      { dataField:'Region', title:'Region', type:'', format:'' },
      { dataField:'AdditionalReq', title:'Requirement', type:'', format:'' },
    ];
    }

    

    if (this.programId > 0) {
      this.listRequirement();
    }
  }
  onCellPrepared (e) {
    try{
          if (e.column.caption == "Requirement") {
         e.cellElement.innerHTML = e.data.AdditionalReq;
         //   e.data.Priority  = "priority_high"; 
          }
    }
    catch(e){

    }
  }  
  listRequirement() {
    this.gridMessage = 'Loading';
    this.requirementService.list(this.programId, this.reqTypeId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
          this.dataList = res;
          this.gridMessage = 'No data';
     // this.contactList = new MatTableDataSource(res);
    });
  }

  deleteRequirement(contactid: number) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.requirementService.delete(contactid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Deleted successfully");
            this.listRequirement();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  addRequirement() {
    if (+this.reqTypeId === 1) {
      this.matDialog.open(AddEnglishRequirementComponent,
        {
          data: { programId: this.programId, institutionId: this.institutionId },
          width: '50%'
        })
        .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.toasterService.pop("success", "Saved successfully");
            this.listRequirement();
          }
        });
    }
    else if (+this.reqTypeId === 2) {
      this.matDialog.open(AddSubjectRequirementComponent,
        { data: { programId: this.programId, institutionId: this.institutionId }, width: '50%' })
        .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.toasterService.pop("success", "Saved successfully");
            this.listRequirement();
          }
        });
    }
    else if(+this.reqTypeId === 3) {
      this.matDialog.open(AddRequirementComponent,
        { data: { programId: this.programId, reqTypeId: this.reqTypeId, reqTypeName: this.reqTypeName, institutionId: this.institutionId }, width: '50%' })
        .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.toasterService.pop("success", "Saved successfully");
            this.listRequirement();
          }
        });
    }
    else
    {
      this.matDialog.open(AddAdditionalRequirementComponent,
        { data: { programId: this.programId, reqTypeId: this.reqTypeId, reqTypeName: this.reqTypeName, institutionId: this.institutionId }, width: '70%' })
        .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.toasterService.pop("success", "Saved successfully");
            this.listRequirement();
          }
        });
    }

  }

  activitylog(){
    this.activityLog.activitylog(this.programId, this.parentName, this.title+' Requirement Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

    ngOnChanges(changes: SimpleChanges) {
    if(this.requirementSubjectInfo !='') this.listRequirement(); 
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
