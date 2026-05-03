import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { enumToName, taskStatus, taskPriority, leadStatus, campaignStatus, applicationStatus } from 'app/models/site-map.model';
import { DashboardService } from 'app/services/dashboard.service';
import { Router } from '@angular/router';
import { TaskAddComponent } from 'app/pages/task/task-add/task-add.component';
import { EventAddComponent } from 'app/pages/event/event-add/event-add.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-my-to-do',
  templateUrl: './my-to-do.component.html',
  styleUrls: ['./my-to-do.component.scss']
})
export class MyToDoComponent implements OnInit, OnDestroy {

  toDoList: MatTableDataSource<any>;
  toDoColumns = ['WorkItem','Title', 'Type' ,'DueDate', 'Status', 'Priority', 'Owner'];

  getname = enumToName;
  taskStatus = taskStatus;
  taskPriority = taskPriority;

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
 
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dashboardService:DashboardService,
    private matDialog:MatDialog,
    private router:Router) { }

  ngOnInit() {
    this.listToDo();
  }

  listToDo()
  {
    this.dashboardService.myToDo().pipe(takeUntil(this.onDestroy$)).subscribe(res => { 
      this.toDoList = new MatTableDataSource(res); 
      this.toDoList.paginator = this.paginator;
    });
  }

  openToDo(toDoItem: any) {
    if (toDoItem.WorkItem.toLowerCase() === 'task') {
      this.matDialog.open(TaskAddComponent, { data: { TaskId: toDoItem.TaskId,forcereadonly:true }, width: '50%' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.listToDo();
      });
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'lead') {
      this.router.navigate(['/member/leads/edit/' + toDoItem.TaskId]);
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'campaign') {
      this.router.navigate(['/member/campaigns/edit/' + toDoItem.TaskId]);
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'event') {
      this.matDialog.open(EventAddComponent, { data: { EventId: toDoItem.TaskId,InstitutionId:0 }, width: '50%' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.listToDo();
      });
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'application') {
      this.router.navigate(['/member/application/view/' + toDoItem.TaskId]);
    }
  }

  getStatusName(toDoItem: any)
  {
    if (toDoItem.WorkItem.toLowerCase() === 'task') {
      return this.getname(taskStatus,toDoItem.TaskStatus);
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'lead') {
      return this.getname(leadStatus,toDoItem.TaskStatus);
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'campaign') {
      return this.getname(campaignStatus,toDoItem.TaskStatus);
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'event') {
      return '';
    }
    else if (toDoItem.WorkItem.toLowerCase() === 'application') {
      return this.getname(applicationStatus,toDoItem.TaskStatus);
    }
  }

  
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
