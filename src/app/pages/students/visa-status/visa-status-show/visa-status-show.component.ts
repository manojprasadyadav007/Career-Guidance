import { Component, OnInit, Input, SimpleChange, ViewChild, OnDestroy } from '@angular/core';
import { StudentVisaService } from 'app/services/student-visa.service';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { VisaStatusAddComponent } from '../visa-status-add/visa-status-add.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ConfirmBoxComponent} from 'app/utility/confirm-box/confirm-box.component';
import { ToasterService } from 'angular2-toaster';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-visa-status-show',
  templateUrl: './visa-status-show.component.html',
  styleUrls: ['./visa-status-show.component.scss']
})
export class VisaStatusShowComponent implements OnInit  , OnDestroy{


  
  dataList:any[];

  columns:any[]=[
    { dataField:'CountryName', title:'Country', type:'', format:'' },
    { dataField:'VisaTypeName', title:'Type', type:'', format:'' },
    { dataField:'VisaStatus', title:'Status', type:'', format:'' },
    { dataField:'IssueDate', title:'Issue Date', type:'date', format:'dd MMM yyyy' },
    { dataField:'ValidUpto', title:'Valid Date', type:'date', format:'dd MMM yyyy' },
  ];
  gridMessage: string = 'No data';
    showFilterRow:boolean=false;
  @Input()
  StudentId: number = 0;

  @Input()
  parentName: '';

  @Input()
  permission:number=0;
   @Input()
  showCard:boolean=true;
  
   private onDestroy$: Subject<void> = new Subject<void>();

  // columnToDisplay: string[] = ['Country', 'Type', 'Status', 'IssueDate', 'ValidUpto', 'Action'];
  // data: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  excel_permisson: number = 0;


  constructor(private studentVisaService: StudentVisaService,
    authService : AuthenticationService,
    private matDialog: MatDialog,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {
    this.list();
  }

  // ngOnChange(changes:SimpleChange)
  // {
  //    this.list();
  // }

  list() {
    this.gridMessage = 'Loading';
    this.studentVisaService.list(this.StudentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.dataList = res;
          this.gridMessage = 'No data';
      // this.data = new MatTableDataSource(res) ;
      //  this.data.paginator = this.paginator;
    });
  }

  delete(StudentVisaId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
   if(res){
      this.studentVisaService.delete(StudentVisaId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "Visa deleted successfully");
        this.list();
      });
   }
  });
  }

  edit(StudentVisaId: number) {
    this.matDialog.open(VisaStatusAddComponent,
      { data: { StudentId:this.StudentId, StudentVisaId: StudentVisaId,permission:this.permission }, width: '80%', minWidth: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Visa updated successfully");
          this.list();
        }
      });
  }

  add() {
    this.matDialog.open(VisaStatusAddComponent,
      { data: { StudentId: this.StudentId,StudentVisaId:0 ,permission:this.permission}, width: '80%', minWidth: '400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Visa saved successfully");
          this.list();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.StudentId, this.parentName, 'Visa Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
