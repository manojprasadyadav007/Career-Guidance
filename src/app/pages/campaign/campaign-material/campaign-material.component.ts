import { Component, OnInit, Input, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { ProgramMaterialService } from 'app/services/program-material.service';
import  {CampaignService } from 'app/services/campaign.service'
import { environment } from 'environments/environment';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-campaign-material',
  templateUrl: './campaign-material.component.html',
  styleUrls: ['./campaign-material.component.scss']
})
export class CampaignMaterialComponent implements OnInit, OnChanges  , OnDestroy {


  dataList:any[];

  columns:any[]=[
    { dataField:'Region', title:'Region', type:'', format:'' },
    { dataField:'MaterialTitle', title:'Title', type:'', format:'' },
    { dataField:'MaterialDescription', title:'Description', type:'', format:'' },
  ];
  private onDestroy$: Subject<void> = new Subject<void>();
    showFilterRow:boolean=false;
  @Input()
  programId: number;
  @Input()
  InstitutionId: number;
  @Input()
  parentName: '';
  @Input()
  RegionId: number;
  @Input()
  parentId:number=0;
  gridMessage: string = 'No data';
  filepath= environment.filepath;
  excel_permisson: number = 0;

  // materialList: MatTableDataSource<any>;

  // columnToDisplay: string[] = ['Region', 'Title', 'Description', 'Action'];

  constructor(private programMaterialService: ProgramMaterialService ,
    authService : AuthenticationService,
    private campaignService :CampaignService,
    private activityLog: ActivityLogService) { 
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
   }

  ngOnInit() {
  
  }
  onCellPrepared (e) {
    try{
          if (e.column.caption == "Description") {
         e.cellElement.innerHTML = e.data.MaterialDescription;
         //   e.data.Priority  = "priority_high"; 
          }
    }
    catch(e){

    }
  } 

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
 
    // this.materialList=null;
    if(this.InstitutionId != null){
      this.gridMessage = 'Loading';
      this.campaignService.material({ProgramId:this.programId,InstitutionId: this.InstitutionId,RegionId : this.RegionId }).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList = res;
        this.gridMessage = 'No data';
        // this.materialList = new MatTableDataSource(res);
      });
    }
  }
  activitylog(){
    this.activityLog.activitylog(this.parentId, this.parentName, 'Marketing Collateral Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
