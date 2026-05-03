import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { TaskService } from 'app/services/task.service';
import { Login } from 'app/models/login.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AuthenticationService } from 'app/services/authentication.service';
import { TaskAddComponent } from 'app/pages/task/task-add/task-add.component';
import { enumToName, taskStatus, taskPriority, parentType, sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit, OnDestroy {
  dataList: any = [];
  showFilterRow: boolean = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  columns: any[] = [
    { dataField: 'TaskOwnerName', title: 'Owner', type: '', format: '' },
    { dataField: 'TaskTypeName', title: 'Type', type: '', format: '' },
    { dataField: 'TaskSubject', title: 'Subject', type: '', format: '' },
    { dataField: 'DueDatenew', title: 'Due Date ', type: 'date', format: 'dd MMM yyyy hh:mm a' },
    { dataField: 'TaskUpdatedStatus', title: 'Status', type: '', format: '' },
    { dataField: 'TaskUpdatedPriority', title: 'Priority', type: '', format: '' },
  ];

  getname = enumToName;
  taskStatus = taskStatus;
  taskPriority = taskPriority;
  gridMessage: string = 'No data';
  currentUser: Login;
  excel_permisson: number = 0;
  
  constructor(private matDialog: MatDialog,
    private taskService: TaskService,
    authService : AuthenticationService,
    private authenticationService: AuthenticationService,
    private activityLog: ActivityLogService) {

    this.currentUser = this.authenticationService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);

  }


  ngOnInit() {
    this.list();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  list() {
    this.gridMessage = 'Loading';
    this.taskService.listByuser(this.currentUser.UserId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        res.forEach((item) => {
          item.DueDatenew = new Date(item.DueDate.split('T')[0] + 'T' + item.DueHours + ':' + item.DueMinutes);
          item.TaskUpdatedStatus = this.getname(taskStatus, item.TaskStatus);
          item.TaskUpdatedPriority = this.getname(taskPriority, item.TaskPriority);
        })
        this.dataList = res;
        this.gridMessage = 'No data';
      });
  }
  add(taskId?: number) {
    this.matDialog.open(TaskAddComponent, {
      data: {
        ParentType: parentType.Task,
        TaskId: taskId
      }
    }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.list();
        }
      })
  }
  delete(evt) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.taskService.delete(evt.TaskId)
            .pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
              this.list();
            });
        }
      });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'User Task', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }


  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }
}
