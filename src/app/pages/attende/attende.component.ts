import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { AttendeService } from 'app/services/attende.service';
import { MatDialog, MatPaginator } from '@angular/material';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AttendeAddComponent } from './attende-add/attende-add.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-attende',
  templateUrl: './attende.component.html',
  styleUrls: ['./attende.component.scss']
})
export class AttendeComponent implements OnInit , OnDestroy {


  dataList:any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  columns:any[]=[
    { dataField:'DisplayName', title:'Name', type:'', format:'' },
    { dataField:'EmailId', title:'Email', type:'', format:'' },
  ];
  gridMessage: string = 'No data';

    showFilterRow:boolean=false;
  @Input()
  parentType:number=0;

  @Input()
  parentName: '';
  
  @Input()
  title: '';

  @Input()
  parentId:number=0;

  @Input()
  attendeType:number=0;

  @Input()
  permission:number=0;

  @Input()
  InstitutionId:number=0;

  @Input()
  RegionId:number=0;

  formdata:any={keyword:''}

  // attendeList:MatTableDataSource<any>;
  // columnToDisplay: string[] = [ 'Name', 'Email', 'Action'];
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  excel_permisson: number = 0;

  constructor(private attendeService:AttendeService,
    private matDialog:MatDialog,
    authService : AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) {
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {
    this.list();
  }

  add()
  {
      this.matDialog.open(AttendeAddComponent,{data:{
        ParentId:this.parentId,
        ParentType:this.parentType,
        AttendeType:this.attendeType,
        InstitutionId:this.InstitutionId,
        RegionId:this.RegionId
      },width:'50%'}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res)
        {
          this.toasterService.pop("success", "Saved successfully");
          this.list();
        }
      })
  }

  delete(attendeId:number)
  {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.attendeService.delete(attendeId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success", "Deleted successfully");
            this.list();
        });
      }
    });
  }

  list()
  {
    this.gridMessage = 'Loading';
    this.attendeService.list(this.parentType,this.parentId,this.attendeType,this.formdata.keyword).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.dataList = res;
        this.gridMessage = 'No data';
      //this.attendeList = new MatTableDataSource(res);
      //this.attendeList.paginator=this.paginator;
    });
  }

  
activitylog(){
  this.activityLog.activitylog(this.parentId, this.parentName, this.title+' Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
