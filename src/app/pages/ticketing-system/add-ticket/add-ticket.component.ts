import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { NgForm } from '@angular/forms';
import { TicketingService } from 'app/services/ticketing-system.service';
import {of  }  from 'rxjs';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit , OnDestroy {

  file:File;
  btnLabel:any;
  formdata: any = {
    ticketNo:0,
  status :null,
  Category:null,
  Description: '',
  priority:null,
  IsNew:false,
  ticketPath:''
  }
  categoryFilter:any='';
  statusFilter:any='';
  PriorityFilter:any='';
  assigneeIDFilter:any='';
  private onDestroy$: Subject<void> = new Subject<void>();
    statusList:any = [{statusId : 1,DisplayName: 'open', },{statusId : 2 ,DisplayName: 'close', }];
    categoryList:any = [{CategoryId: 1 , CategoryName: 'College' },{CategoryId: 2 , CategoryName: 'Studend' }];
    priorityList:any = [{priotityId: 1 , priotityIdName: 'high' },{priotityId: 2 , priotityIdName: 'medium' },{priotityId: 3 , priotityIdName: 'low' }];
    assignedList:any = [{assignedId: 1 , assignedName: 'user 1'},{assignedId: 2 , assignedName: 'user 2'}];



  constructor(  @Inject(MAT_DIALOG_DATA) data, private matDialogRef: MatDialogRef<AddTicketComponent> , private ticketingservice :  TicketingService ) { 
  if (data.ticketNo > 0) {
    this.btnLabel = 'update';
    this.formdata = data
  }else{
    this.btnLabel = 'add';
  }
}
 myObservable = of(1, 2, 3);
  ngOnInit() {
    
  }

  add(form: NgForm) {

    if (form.invalid) {
      return;
    }
    
    this.myObservable.pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.matDialogRef.close(true);
          this.formdata ={};
        });

  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  
}
