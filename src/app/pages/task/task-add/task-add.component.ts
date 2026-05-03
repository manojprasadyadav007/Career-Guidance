import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { TaskService } from 'app/services/task.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { taskStatus, recurringMode, taskPriority, enumToArray, sitemap, parentType, appPattern } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { UserService } from 'app/services/user.service';
import { Login } from 'app/models/login.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { StudentDocumentService } from 'app/services/student-document.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit, OnDestroy {

  uploadDir = "tasks";
  parentName= 'Campaing';
  formdata: any = {
    TaskId: 0,
    ParentId: 0,
    ParentType: 0,
    TaskSubject: '',
    DueDate: '',
    minDueDate: '',
    TaskStatus: 0,
    TaskPriority: 0,
    TaskDescription: '',
    ReminderDate: '',
    minReminderDate:'',
    maxReminderDate: '',
    isRecurring: false,
    RecurringMode: -1,
    RecurranceStart: '',
    minRecurranceStart: '',
    RecurranceEnd: '',
    minRecurranceEnd: '',
    AssignedTo: null,
    TaskOwner: null,
    TaskResponse: '',
    TaskType: null,
    DueHours: null,
    DueMinutes: null  
  }
  ownerFilter: any = '';
  assignFilter: any = '';
  typeFilter: any = '';
  priortyFilter: any = '';
  statusFilter: any = '';
  modeFilter: any = '';
  flagdisable: boolean = false;

  tastStatusList = enumToArray(taskStatus);
  recurringModeList = enumToArray(recurringMode);
  taskPriorityList = enumToArray(taskPriority);
  taskTypeList: any[];

  userList: any[];

  permission: number = 0;

  isAdd: boolean = false;

  btnLabel: string = 'Add';

  currentUser: Login;
  docList: any[] = [];
  modelPattern = appPattern;
  isDateDisable: boolean;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private studentDocumentService: StudentDocumentService,
    @Inject(MAT_DIALOG_DATA) data,
    private matDialogRef: MatDialogRef<TaskAddComponent>,
    authService: AuthenticationService,
    private userService: UserService,
    private matDialog: MatDialog,
    private toasterService: ToasterService 
    ) {

    this.currentUser = authService.currentUserSubject.getValue();

    if (data) {
      this.formdata.ParentId = +data.ParentId;
      this.formdata.ParentType = +data.ParentType;
      this.formdata.TaskId = +data.TaskId | 0;
      this.permission = +data.permission | 0;
      this.formdata.TaskOwner = this.currentUser.UserId;

      if (data.TaskDate) {
        this.formdata.DueDate = data.TaskDate;
      }
      else {
        this.isDateDisable = true;
        this.formdata.minDueDate = new Date();
      }
    }


    if (this.permission === 0) {
      if (this.formdata.ParentType === parentType.Campaign) {
        this.permission = authService.checkPermission(sitemap.Campaign);
      }
      else if (this.formdata.ParentType === parentType.Application) {
        this.permission = authService.checkPermission(sitemap.Applications);
      }
      else if (this.formdata.ParentType === parentType.Task) {
        this.permission = 2;
        this.formdata.AssignedTo = this.currentUser.UserId;
      }
    }

    //Fetch TaskTypeList
    this.taskService.getTaskType().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.taskTypeList = res;
    });
  }

  ngOnInit() {

    this.userService.forDDL('', '', 0)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.userList = res;
      });

    this.get();
  }

  onDueDateChange(event) {
    this.isDateDisable = false; 
    this.formdata.DueDate =new Date(event);
    this.formdata.minReminderDate = new Date(new Date().setDate(new Date().getDate() + 1));
     this.formdata.maxReminderDate = new Date(new Date(event).setDate(new Date(event).getDate() - 1));     
    this.formdata.minRecurranceStart = new Date(new Date(event).setDate(new Date(event).getDate() + 1));
    this.formdata.minRecurranceEnd =  new Date(new Date(event).setDate(new Date(event).getDate() + 1));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  add(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.flagdisable = true;
    if (this.formdata.TaskId > 0) {

      this.taskService.update(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success", "Task updated successfully");
          this.matDialogRef.close(true);
        }, err => {
          this.flagdisable = false;
        });
    }
    else {

            this.taskService.add(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (this.formdata.TaskType === 2) {
            let documentsList = {
              ParentId: +res,
              ParentType: 3,
              Documents: this.docList
            }
            if (documentsList.Documents.length > 0) {
              this.studentDocumentService.AddBulkWithName(documentsList).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
                if (res) {
                  this.toasterService.pop("success", "Task saved successfully");
                  }
              });
            } else {
              this.toasterService.pop("success", "Task saved successfully");
            }

          } else {
            this.toasterService.pop("success", "Task saved successfully");
          }
          this.matDialogRef.close(res);
        }, err => {
          this.flagdisable = false;
        });
    }
  }

  getArray($event) {
    this.docList = $event;
  }
  get() {
    if (this.formdata.TaskId > 0) {
      var prntid = this.formdata.ParentId;
      var prnttyp = this.formdata.ParentType;
      var tskid = this.formdata.TaskId;

      this.taskService.get(this.formdata.TaskId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.formdata = res;
          this.formdata.ParentId = prntid;
          this.formdata.ParentType = prnttyp;
          this.formdata.TaskId = tskid;

          if (this.formdata.TaskOwner === this.currentUser.UserId) {
            this.permission = 3;
          }

          this.btnLabel = 'Update';
        });
    }
  }
  recurrChange(){
    if(this.isDateDisable && this.permission<2)
    {
    return;      
    }
      this.formdata.RecurranceEnd = '';
     this.recurranceStartDateChange(this.formdata.RecurranceStart)
  }
  recurranceStartDateChange(event:any){
    if(this.formdata.RecurringMode ==0){
      this.formdata.minRecurranceEnd = new Date(new Date(event).setDate(new Date(event).getDate()+ 1));
    }else if(this.formdata.RecurringMode ==1){
      this.formdata.minRecurranceEnd = new Date(new Date(event).setDate(new Date(event).getDate()+ 7));
    }else if(this.formdata.RecurringMode ==2){
      this.formdata.minRecurranceEnd =   new Date(new Date(event).setMonth(new Date(event).getMonth() + 1))
    }else if(this.formdata.RecurringMode == 3){
      this.formdata.minRecurranceEnd =   new Date(new Date(event).setMonth(new Date(event).getMonth() + 12))
    }
  }


  delete() {
    this.matDialog.open(ConfirmBoxComponent).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.taskService.delete(this.formdata.TaskId)
            .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              if (res == 'OK') {
                this.toasterService.pop("success","Task deleted successfully");
                this.matDialogRef.close(true);
              }
            });
        }
      });
  }
}
