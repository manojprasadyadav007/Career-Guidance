import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from 'app/services/role.service';
import { MatTableDataSource } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit , OnDestroy {

  formdata: any = { roleId: 0 };
  dataList:any[];
  roleFilter:any ='';
  columns:any[]= [
    { dataField:'Title', title:'Name', type:'', format:'' },
    ];
  showFilterRow:boolean=false;
  gridMessage: string = 'No data';
  roleList: any[];
  // rolePermission: MatTableDataSource<any>;
  // columnToDisplay: string[] = ['Name', 'NA', 'RO', 'RW', 'FC'];
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(private roleService: RoleService, 
    private toastService: ToasterService,
    private activatedRoute: ActivatedRoute,
    private authService:AuthenticationService,
    private router:Router,
    private activityLog: ActivityLogService
  ) {
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
   }

  ngOnInit() {

    if(this.authService.currentUserSubject.getValue().RoleId!=1)
    {
       this.router.navigate(['/member/unauthorized']);
       return;
    }

    this.getRole();
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.formdata.roleId = +param.get("id");
    });
  }

  getRole() {
    this.roleService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.roleList = res.filter(d=>{return d.RoleId>100});
      if(this.formdata.roleId>0)
      {
        this.getRolePermission();
      }
    });
  }
  getRolePermission() {
    this.gridMessage = 'Loading';
    this.roleService.listPermission(this.formdata.roleId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.dataList =res;
          this.gridMessage = 'No data';
      //this.rolePermission = new MatTableDataSource(res);
    });
  }

  onSubmit() {
    this.roleService.updatePermission(this.formdata.roleId, this.dataList).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.toastService.pop('success', 'Permission updated successfully');
    });
  }

  onCellPrepared (e) {
    try{
          if (e.column.caption == "Name") {
         e.cellElement.innerHTML = '<span> '+e.data.Title +'</span><br> <span style="font-size: 12px;" class="text-info d-block" *ngIf="institute.Description">'+e.data.Description+'</span>';
          }
    }
    catch(e){

    }
  }  


  changePermission(row: any, permission: number) {
    if (row.Permission === permission) {
      return false;
    }
    else {
      row.Permission = permission;
      return true;
    }
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Role Permission', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
