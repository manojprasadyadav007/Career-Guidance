import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { environment } from 'environments/environment';
import { ProgramMaterialService } from 'app/services/program-material.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ProgramMaterialAddComponent } from '../program-material-add/program-material-add.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-program-material-show',
  templateUrl: './program-material-show.component.html',
  styleUrls: ['./program-material-show.component.scss']
})
export class ProgramMaterialShowComponent implements OnInit , OnDestroy {

  // columnToDisplay: string[] = ['Region','Title', 'Description', 'Action'];
  // contactList: MatTableDataSource<any>;
  gridMessage: string = 'No data';
  dataList:any[];

  columns:any[]=[
    { dataField:'Region', title:'Region', type:'', format:'' },
    { dataField:'MaterialTitle', title:'Title', type:'', format:'' },
    { dataField:'MaterialDescription', title:'Description', type:'', format:'' },
  ];

    showFilterRow:boolean=false;

  @Input()
  programId: number = 0;
  
  @Input()
  parentName: '';

  @Input()
  title: '';
  
  private onDestroy$: Subject<void> = new Subject<void>();
  @Input()
  institutionId:number=0;

  @Input()
  showCard:boolean=true;

  filepath:string=environment.filepath ;

  permission:number;

  currentUser:Login;
  excel_permisson: number = 0;

  constructor(private programMaterialService: ProgramMaterialService,
    private matDialog: MatDialog,
    private authService:AuthenticationService,
    private activateRoute:ActivatedRoute,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService) {
      this.currentUser = this.authService.currentUserSubject.getValue();
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {

    if(this.currentUser.RoleType === 2) {
      this.permission = this.authService.checkPermission(sitemap.Programs);
    }
    else
    {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }

    if (this.programId > 0) {
      this.list();
    }
  }

  list() {
    this.gridMessage = 'Loading';
    this.programMaterialService.list(this.programId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
          this.dataList = res;
          this.gridMessage = 'No data';
      //this.contactList = new MatTableDataSource(res);
    });
  }
  onCellPrepared (e) {

    try{
        if(e.column.caption == 'Description'){
               e.cellElement.className= 'text-wrap';
        }
    }
    catch(e){

    }
  }
      //console.log(e.column.capt

  delete(MaterialId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.programMaterialService.delete(MaterialId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", "Marketing-Collateral deleted successfully ");
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
    this.matDialog.open(ProgramMaterialAddComponent,
      { data: { ProgramId: this.programId,institutionId:this.institutionId } })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Marketing-Collateral saved successfully");
          this.list();
        }
      });
  }

  edit(MaterialId:number) {
    this.matDialog.open(ProgramMaterialAddComponent,
      { data: { ProgramId: this.programId,MaterialId:MaterialId,institutionId:this.institutionId}})
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success", "Marketing-Collateral updated successfully");
          this.list();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.programId, this.parentName, this.title+' Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
