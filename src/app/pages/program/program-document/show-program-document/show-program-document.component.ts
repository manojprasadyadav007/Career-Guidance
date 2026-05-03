import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ProgramDocumentService } from 'app/services/program-document.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AddProgramDocumentComponent } from '../add-program-document/add-program-document.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-show-program-document',
  templateUrl: './show-program-document.component.html',
  styleUrls: ['./show-program-document.component.scss']
})
export class ShowProgramDocumentComponent implements OnInit , OnDestroy {

  // columnToDisplay: string[] = ['Region','Name','Action'];
  // contactList: MatTableDataSource<any>;
  gridMessage: string = 'No data';
  dataList:any[];

  columns:any[]=[
    { dataField:'Region', title:'Region', type:'', format:'' },
    { dataField:'DocumentName', title:'Name', type:'', format:'' }
  ];

    showFilterRow:boolean=false;
    private onDestroy$: Subject<void> = new Subject<void>();
  @Input()
  programId: number = 0;
  @Input()
  permission: number = 0;

  @Input()
  parentName: '';

  @Input()
  title: '';

  @Input()
  institutionId: number = 0;
  excel_permisson: number = 0;

  


  constructor(private programDocumentService: ProgramDocumentService,
    private matDialog: MatDialog,
    authService : AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService
    ) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
    }

  ngOnInit() {

    if (this.programId > 0) {
      this.listContact();
    }
  }

  onCellPrepared (e) {
    try{
          if (e.column.caption == "Name") {
         e.cellElement.innerHTML = e.data.DocumentName;
         //   e.data.Priority  = "priority_high"; 
          }
    }
    catch(e){

    }
  }  

  listContact() {
    this.gridMessage = 'Loading';
    this.programDocumentService.list(this.programId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.dataList =res;
      this.gridMessage = 'No data';
      // this.contactList = new MatTableDataSource(res);
    });
  }

  deleteContact(contactid: number) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.programDocumentService.delete(contactid).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Deleted successfully");
            this.listContact();
          }
          else {
            alert(res);
          }
        });
      }
    });
  }

  addContact() {
    this.matDialog.open(AddProgramDocumentComponent,
      { data: { programId: this.programId ,institutionId:this.institutionId}, width: '80%' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Saved successfully");
          this.listContact();
        }
      });
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
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
