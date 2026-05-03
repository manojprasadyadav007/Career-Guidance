import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { InstituteMaterialService } from 'app/services/institute-material.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { InstitutionMaterialAddComponent } from '../institution-material-add/institution-material-add.component';
import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-institution-material-show',
  templateUrl: './institution-material-show.component.html',
  styleUrls: ['./institution-material-show.component.scss']
})
export class InstitutionMaterialShowComponent implements OnInit , OnDestroy {

  columnToDisplay: string[] = ['Region','Title', 'Description', 'Action'];
  contactList: MatTableDataSource<any>;

  @Input()
  institutionId: number = 0;

  @Input()
  parentName: '';

  filepath:string=environment.filepath ;

  permission:number;

  isPage:boolean;

  currentUser: Login;
  @Input()
  showCard:boolean=true;

  dataList:any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  columns:any[]=[
    { dataField:'Region', title:'Region', type:'', format:'' },
    { dataField:'MaterialTitle', title:'Group', type:'', format:'' },
    { dataField:'MaterialDescription', title:'File name', type:'', format:'' },
    ];
    gridMessage: string = 'No data';
    showFilterRow:boolean=false;
  excel_permisson: number = 0;

  constructor(private instMaterialService: InstituteMaterialService,
    private matDialog: MatDialog,
   private  authService:AuthenticationService,
    private activateRoute:ActivatedRoute,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService,) { 
     //  this.permission = this.authService.checkPermission(sitemap.Institutions);
        this.currentUser = this.authService.currentUserSubject.getValue();
        this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     

    }

  ngOnInit() {

    if(this.currentUser.RoleType === 2) {
      this.institutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Marketing_Collateral);
    }
    else
    {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
      this.activateRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        if(res.get('id'))
        {
          this.institutionId = +res.get('id');
          this.isPage=true;
        }
     });

    }
    
    

    if(this.permission<1)
    {
      return;
    }
    if (this.institutionId > 0) {
      this.list();
    }
  }

  list() {
    this.gridMessage = 'Loading';
    this.instMaterialService.list(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
       this.dataList = res;
       this.gridMessage = 'No data';
      //  this.contactList = new MatTableDataSource(res);

    });
  }

  delete(MaterialId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.instMaterialService.delete(MaterialId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == "OK") {
            this.toasterService.pop("success", " Marketing collateral deleted successfully ");
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
    this.matDialog.open(InstitutionMaterialAddComponent,
      { data: { InstitutionId: this.institutionId },width: '70%',minWidth:'400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success","Marketing collateral saved successfully");
          this.list();
        }
      });
  }

  edit(MaterialId:number) {
    this.matDialog.open(InstitutionMaterialAddComponent,
      { data: { InstitutionId: this.institutionId,MaterialId:MaterialId},width: '70%',minWidth:'400px' })
      .afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop("success","Marketing collateral updated successfully");
          this.list();
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.institutionId, this.parentName, 'Marketing Collateral Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
