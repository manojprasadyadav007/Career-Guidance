import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { TaskService } from 'app/services/task.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { taskStatus, enumToName, taskPriority, sitemap } from 'app/models/site-map.model';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { ActivityLogService } from 'app/services/activity-log.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit , OnDestroy {


  gridMessage: string = 'No data';
  dataList:any[];

  columns:any[]=[
    { dataField:'TaskSubject', title:'Subject', type:'', format:'' },
    { dataField:'TaskUpdatedType', title:'Type', type:'', format:'' },
    { dataField:'DueDatenew', title:'Due Date ', type:'date', format:'dd MMM yyyy hh:mm a' },
    { dataField:'TaskUpdatedStatus', title:'Status', type:'', format:'' },
    { dataField:'TaskUpdatedPriority', title:'Priority', type:'', format:'' },
  ];

    showFilterRow:boolean=false;
  //parent type defined in sitemap model
  @Input()
  parentType: number = 0;

  @Input()
  parentId: number = 0;

  @Input()
  permission: number = 0;

  @Input()
  parentName: '';

  @Input()
  title: '';

  
  @Input()
  showCard:boolean=true;

  formdata: any = { keyword: '' }

  getname = enumToName;
  taskStatus = taskStatus;
  taskPriority = taskPriority;


   //  dataList: MatTableDataSource<any>;
 //columnToDisplay: string[] = ['Subject', 'Type', 'DueDate', 'Status', 'Priority', 'Action'];

  //@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  currentUser: Login;


  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private taskService: TaskService,
    private matDialog: MatDialog,
    private authService: AuthenticationService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.list();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  add(taskId?: number) {
    this.matDialog.open(TaskAddComponent, {
      data: {
        ParentId: this.parentId,
        ParentType: this.parentType,
        permission: this.permission,
        TaskId: taskId
      }
    }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.list();
        }
      })
  }

  delete(taskId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.taskService.delete(taskId)
            .pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
              this.toasterService.pop("success", "Task deleted Successfully");
              this.list();
            });
        }
      });
  }

  list() {
    this.gridMessage = 'Loading';
    this.taskService.list(this.parentId, this.parentType, this.formdata.keyword)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        res.forEach((item) => {
              item.DueDatenew = new Date(item.DueDate.split('T')[0] +'T'+ item.DueHours +':'+ item.DueMinutes);
              item.TaskUpdatedType =  item.TaskTypeName;
              item.TaskUpdatedStatus  = this.getname(taskStatus,item.TaskStatus);
              item.TaskUpdatedPriority = this.getname(taskPriority,item.TaskPriority);
        })
        this.dataList = res
        this.gridMessage = 'No data';
       // this.dataList.paginator = this.paginator;
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.parentId, this.parentName, this.title+' Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }v

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

}
