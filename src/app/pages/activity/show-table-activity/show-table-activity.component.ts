
import { Component, OnInit, Input,  OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-show-table-activity',
  templateUrl: './show-table-activity.component.html',
  styleUrls: ['./show-table-activity.component.scss']
})
export class ShowTableActivityComponent implements OnInit,OnChanges, OnDestroy {


  // columnToDisplay: string[] = ['Priority','Status', 'Remark', 'User','Stamp'];
  // contactList: MatTableDataSource<any>;
  dataList:any[];
  columns:any[]= [];
  excel_permisson:number = 0;
  showFilterRow:boolean=false;
  @Input()
  activityList:any[];

  @Input()
  showPriority:boolean=false;

  @Input()
  parentName: '';
  @Input()
  activityId: number= 0;
  @Input()
  showCard:boolean=true;

  private onDestroy$: Subject<void> = new Subject<void>();
 
  constructor(private authService: AuthenticationService,
    private activityLog: ActivityLogService) { 
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
      if(this.showPriority){
          this.columns =[
            { dataField:'Priority', title:'Priority', type:'', format:'' },
             { dataField:'ActivityStatus', title:'Status', type:'', format:''},
             { dataField:'ActivityRemark', title:'Remark', type:'' , format:'' },
             { dataField:'DisplayName', title:'Update By ', type:'' , format:''},
             { dataField:'ActivityStamp', title:'Update On ', type:'date' , format:'dd MMM yyyy' },
           
          ];
      }else{
        this.columns =[
           { dataField:'ActivityStatus', title:'Status', type:'', format:'' },
           { dataField:'ActivityRemark', title:'Remark', type:'' , format:'' },
           { dataField:'DisplayName', title:'Update By ', type:'' , format:'' },
           { dataField:'ActivityStamp', title:'Update On ', type:'date' , format:'dd MMM yyyy' },
        
        ];

      }

    this.fillTable();
  }


  onCellPrepared (e) {
  try{
        if (e.column.caption == "Priority") {
          e.data.Priority  = "priority_high"; 
          if(e.data.ActivityPriority = -1){
            e.cellElement.style.color =  "yellow"; 
          }else if(e.data.ActivityPriority = 1){
            e.cellElement.style.color =  "orange"; 
          }else if(e.data.ActivityPriority = 2){
            e.cellElement.style.color =  "red"; 
          }
    }
  }
    catch(e){

    }
   
}

  ngOnChanges(simpleChange:SimpleChanges)
  {
    this.fillTable();
  }

  fillTable()
  {
  try{
    this.activityList.forEach((e) =>{
      if(e.ActivityPriority){
      e.Priority = 'priority_high';
    }

    })
    this.dataList = this.activityList;
  }
  catch(e){

  }
   
     //this.contactList = new MatTableDataSource(this.activityList);
  }
  activitylog(){
    this.activityLog.activitylog(this.activityId, this.parentName, 'Status Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
