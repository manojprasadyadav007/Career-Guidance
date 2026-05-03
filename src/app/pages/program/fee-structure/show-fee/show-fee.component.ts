import { OnInit, Input, Component, OnDestroy } from "@angular/core";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { ProgramFeeService } from "app/services/program-fee.service";
import { ConfirmBoxComponent } from "app/utility/confirm-box/confirm-box.component";
import { AddFeeComponent } from "../add-fee/add-fee.component";
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { sitemap } from "app/models/site-map.model";
import { AuthenticationService } from "app/services/authentication.service";
import { ActivityLogService } from "app/services/activity-log.service";

@Component({
  selector: 'app-show-fee',
  templateUrl: './show-fee.component.html',
  styleUrls: ['./show-fee.component.scss']
})
export class ShowFeeComponent implements OnInit , OnDestroy{

  // columnToDisplay: string[] = ['Intake','Region','Type', 'Basis', 'Amount','Deadline','TAT' ,'Action'];
  // contactList: MatTableDataSource<any>;
  gridMessage: string = 'No data';
  dataList:any[];

  columns:any[]=[
    { dataField:'Intake', title:'Intake', type:'', format:'' },
    { dataField:'Region', title:'Region', type:'', format:'' },
    { dataField:'FeeType', title:'Type', type:'', format:'' },
    { dataField:'FeeBasis', title:'Basis', type:'', format:'' },
    { dataField:'FeeAmount', title:'Amount', type:'', format:'' },
    { dataField:'Deadline', title:'Deadline', type:'date', format:'dd MMM yyyy' },
    { dataField:'TAT', title:'TAT', type:'', format:'' },
  ];

    showFilterRow:boolean=false;

  @Input()
  programId: number = 0;

  @Input()
  instituionId:number=0;

  @Input()
  parentName: '';

  @Input()
  permission: number = 0;

  @Input()
  currency: string = ''
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private intekService: ProgramFeeService,
    authService : AuthenticationService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
    if (this.programId > 0) {
      this.list();
    }
  }

  list() {
    this.gridMessage = 'Loading';
    this.intekService.list(this.programId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
        this.dataList = res;
        this.gridMessage = 'No data';
      // this.contactList = new MatTableDataSource(res);
    });
  }

  delete(contactid: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.intekService.delete(contactid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Fee deleted successfully");
            this.list();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  add() {
    this.matDialog.open(AddFeeComponent,
      { data: { programId: this.programId, IntekId: 0,instituionId:this.instituionId } })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Fee saved successfully");
          this.list();
        }
      });
  }

  edit(intekId: number) {
    this.matDialog.open(AddFeeComponent,
      { data: { programId: this.programId, FeeId: intekId,instituionId:this.instituionId } })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Fee updated successfully");
          this.list();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.programId, this.parentName, 'Fee Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
