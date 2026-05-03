import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'app/services/user.service';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';


@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.scss']
})
export class UserPermissionComponent implements OnInit , OnDestroy {

  @Input()
  UserId:number;
  gridMessage: string = 'No data';
  // rolePermission: MatTableDataSource<any>;
  // columnToDisplay: string[] = ['Name', 'NA', 'RO', 'RW', 'FC'];
  private onDestroy$: Subject<void> = new Subject<void>();
  dataList:any[];
  columns:any[]= [
    { dataField:'Title', title:'Name', type:'', format:'' },
    ];
  showFilterRow:boolean=false;

  uiPermission:number;
  excel_permisson: number = 0;

  constructor(private userService: UserService, 
    private toastService: ToasterService,
    private authService:AuthenticationService,
    private activityLog: ActivityLogService
  ) {
    this.uiPermission = authService.checkPermission(sitemap.Users);
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
   }

  ngOnInit() {
    this.getRolePermission();
  }


  getRolePermission() {
    this.gridMessage = 'Loading';
    this.userService.listPermission(this.UserId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      var data = res;
      
      data.forEach(value=>{
        value.maxPermission= this.authService.checkPermission(value.EntityId);
      });

      data=data.filter(d=> +d.maxPermission>0);
        this.dataList =res;
        this.gridMessage = 'No data';
      // this.rolePermission = new MatTableDataSource(data);
    });
  }

  onSubmit() {
    this.userService.updatePermission(this.UserId, this.dataList).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.toastService.pop('success', 'Permission updated successfully');
    });
  }

  changePermission(row: any, permission: number) {
    if (row.Permission === permission) {
      return false;
    }
    else {
     var maxPermission = this.authService.checkPermission(row.EntityId);
     if(permission>maxPermission)
     {
        return false;
     }
     else
     {
      row.Permission = permission;
      return true;
     }
     
    }
  }

  activitylog(){
    this.activityLog.activitylog(this.UserId, 'User', 'Permission Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
