import { Component, OnInit, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { DashboardService } from 'app/services/dashboard.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { UserService } from 'app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddComponent } from 'app/pages/task/task-add/task-add.component';
import { taskStatus, enumToName, taskPriority, enumToArray, parentType } from 'app/models/site-map.model';
import { TaskService } from 'app/services/task.service';
import { ToasterService } from 'angular2-toaster';
import { ActivityService } from 'app/services/activity.service';
import { environment } from 'environments/environment';
import { NgForm } from '@angular/forms';
import { tooltip } from 'app/pages/dashboard/dashboard-tooltip.module'

@Component({
  selector: 'app-task-display,[app-task-display]',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.scss']
})
export class TaskDisplayComponent implements OnInit, OnDestroy {

  currentUser: Login;

  userList: any[];

  dataList: any[];

  selectedUser: number;

  filteredTask: any[];
  

  filepath = environment.filepath;
  gridMessage: string = 'No data';


  private onDestroy$: Subject<void> = new Subject<void>();



  getname = enumToName;
  taskStatus = taskStatus;
  taskPriority = taskPriority;
  tastStatusList = enumToArray(taskStatus);

  currentTask: any;

  selectedPriority: number;

  comment: string;


  constructor(authService: AuthenticationService,
    private dashboardService: DashboardService,
    private userService: UserService,
    private matDialog: MatDialog,
    private taskService: TaskService,
    private toasterService: ToasterService,
    private activityService: ActivityService,
    public tooltip : tooltip
  ) {
    this.currentUser = authService.currentUserSubject.getValue();
    this.selectedUser = this.currentUser.UserId;
  }

  ngOnInit() {
    this.listTask();

    this.userService.downTeamForDDL("", "", "", "")
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.userList = res;
      });

  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  listTask() {
    this.gridMessage = 'Loading';
    this.dashboardService.taskDisplay(this.selectedUser)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList = res;
        this.gridMessage = 'No data';
        this.filterTask(this.selectedPriority);
        if (!this.currentTask && this.dataList && this.dataList.length > 0) {
          this.getTask(this.dataList[0].TaskId);
        }
      });
  }

  createTask() {
    this.matDialog.open(TaskAddComponent, { data: { ParentType: parentType.Task } }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.listTask();
        }
      });
  }

  filterTask(prioirty?: number) {
    this.selectedPriority = prioirty;

    if (prioirty === undefined || prioirty === null) {
      this.filteredTask = this.dataList;
    }
    else {
      this.filteredTask = this.dataList.filter(value => value.TaskPriority === prioirty);
    }
  }

  getTask(taskId: number) {
    this.taskService.get(taskId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.currentTask = res;
        this.listComment();
      });
  }

  updateTask() {
    this.taskService.update(this.currentTask)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Task updated successfully');
        this.listTask();
      });
  }

  listComment() {
    if (this.currentTask) {
      this.activityService.list(13, this.currentTask.TaskId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.currentTask.comments = res;
          this.comment = null;
        });
    }
  }

  addComment(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let replydata = { ActivityType: 13,ApplicationId:this.currentTask.TaskId, Remark: this.comment, StatusId: this.currentTask.TaskStatus, Priority: -1 };
    this.activityService.add(replydata)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.listComment();
      });
  }

  editTask(taskId:number) {
    this.matDialog.open(TaskAddComponent, { data: { TaskId:taskId } }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.listTask();
        }
      });
  }
}
