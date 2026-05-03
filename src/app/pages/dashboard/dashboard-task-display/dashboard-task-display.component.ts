import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from 'app/services/dashboard.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InstitutionIntakeService } from 'app/services/institution-intake.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddComponent } from 'app/pages/task/task-add/task-add.component';
import {TaskService } from 'app/services/task.service';
import { UserService } from 'app/services/user.service';
import {ActivityService } from 'app/services/activity.service';
import {parentType } from 'app/models/site-map.model';
 
@Component({
  selector: 'app-dashboard-task-display',
  templateUrl: './dashboard-task-display.component.html',
  styleUrls: ['./dashboard-task-display.component.scss']
})
export class DashboardTaskDisplayComponent  implements OnInit, OnDestroy{

  currentUser: Login;
  selectedPriority: number;
  filteredTask:any;
  assign: any = "";
  dataList:any;
  AssignedTo:any;
  formdatafilter:any={};
  userList:any;
  pageIndex: number = 1;
  comments:any=[];
  formdata=  {
    AssignedTo:0,
    FromDate:null,
    ToDate:new Date(),
    TaskPriority:-1
    }
  
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private matDialog: MatDialog,
    private taskService: TaskService,
    private  userService : UserService,
    private activityService: ActivityService,) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.AssignedTo = this.currentUser.UserId;
      
   }

  ngOnInit() {
    this.userService.downTeamForDDL("", "", "", "")
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.userList = res;
      this.formdata.AssignedTo = this.currentUser.UserId;
      this.listTask();
    });
  }

  listTask() {
    this.taskService.listByFilter(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(list =>{
      this.dataList = list;  
      this.filterTask(this.selectedPriority);   
    })
    // this.dashboardService.taskDisplay(this.selectedUser)
    //   .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    //     this.dataList = res;
    //     console.log(res)
    //     this.filterTask(this.selectedPriority);
    //     // if (!this.currentTask && this.dataList && this.dataList.length > 0) {
    //     //   this.getTask(this.dataList[0].TaskId);
    //     // }
    //   });

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

  createTask() {
    this.matDialog.open(TaskAddComponent, { data: { ParentType: parentType.Task } }).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.listTask();
        }
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
    fillComments(item){
      this.comments =[];
  this.activityService.list(13, item.TaskId)
  .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    this.comments = res;
  });
}
  filterdate(e){
    this.formdata.FromDate = new Date(e);
    this.listTask();
  }
  filterdateTodate(e){
    this.formdata.ToDate = new Date(e);
    this.listTask();
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
