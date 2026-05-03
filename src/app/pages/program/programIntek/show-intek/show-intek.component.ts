import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ProgramIntekService } from 'app/services/program-intek.service';
import { AddIntekComponent } from '../add-intek/add-intek.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-show-intek',
  templateUrl: './show-intek.component.html',
  styleUrls: ['./show-intek.component.scss']
})
export class ShowIntekComponent implements OnInit , OnDestroy {



  // columnToDisplay: string[] = ['Region','Zone','IntakeName','Date', 'Status','Deadline','Capacity','OfferLetter','LOA','FeeReceive','Action'];
  // contactList: MatTableDataSource<any>;

  gridMessage: string = 'No data';
  
  dataList:any[];

  @Input()
  ProgramIntakeInfo:'';

  columns:any[]=[
    { dataField:'Region', title:'Region', type:'', format:'' },
    { dataField:'Zone', title:'Zone', type:'', format:'' },
    { dataField:'IntakeName', title:'Name', type:'', format:'' },
    { dataField:'IntekDate', title:'Date', type:'date', format:'dd MMM yyyy' },
    { dataField:'OnshoreSubmissionDeadline', title:'OnShore Deadline', type:'date', format:'dd MMM yyyy' },
    { dataField:'SubmissionDeadline', title:'OffShore Deadline', type:'date', format:'dd MMM yyyy' },
    { dataField:'Capacity', title:'Capacity', type:'', format:'' },
    { dataField:'OfferLetterTAT', title:'Offer Letter', type:'', format:'' },
    { dataField:'LOA_TAT', title:'LOA', type:'', format:'' },
    { dataField:'FeeReceiveTAT', title:'Fee Receive', type:'', format:'' },
    { dataField:'IntekStatus', title:'Status', type:'', format:'' },
  ];

    showFilterRow:boolean=false;

  @Input()
  programId: number = 0;

  @Input()
  parentName: '';

  @Input()
  institutionId:number=0;

  @Input()
  permission:number=0;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private intekService: ProgramIntekService,
    private matDialog: MatDialog,
    authService : AuthenticationService,
    private toasterService:ToasterService,
    private activityLog: ActivityLogService) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
    if (this.programId > 0) {
      this.listIntek();
    }
  }

  listIntek() {
    this.gridMessage = 'Loading';
    this.intekService.list(this.programId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.dataList = res;
        this.gridMessage = 'No data';
      //   this.contactList = new MatTableDataSource(res);
    });
  }

  deleteIntek(contactid: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      if(res)
      {
        this.intekService.delete(contactid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success','Intake deleted successfully');
            this.listIntek();
          
        });
      }
    });
  }

  addIntek() {
    this.matDialog.open(AddIntekComponent,
      { data: { programId: this.programId,IntekId:0,institutionId:this.institutionId,permission:this.permission } })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.listIntek();
        }
      });
  }

  editIntek(intekId:number) {
    this.matDialog.open(AddIntekComponent,
      { data: { programId: this.programId,IntekId:intekId,institutionId:this.institutionId,permission:this.permission } })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.listIntek();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.programId, this.parentName, 'Intake Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {

    if(this.ProgramIntakeInfo !=''||this.ProgramIntakeInfo!='') this.listIntek(); 
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
