import { Component, OnDestroy, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { TicketingService } from 'app/services/ticketing-system.service';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
@Component({
  selector: 'app-ticketing-system',
  templateUrl: './ticketing-system.component.html',
  styleUrls: ['./ticketing-system.component.scss']
})
export class TicketingSystemComponent implements OnInit,OnDestroy {

  permission:number=0;
  private onDestroy$: Subject<void> = new Subject<void>();
  dataList:any[];
  columns:any[]=[
    {
      dataField:'ticketNo',
      title:'Ticket No.',
      type:'',
      format:''
    },
    {
      dataField:'Description',
      title:'Description',
      type:'',
      format:''
    },
    {
      dataField:'Assignedto',
      title:'Assigned To',
      type:'',
      format:''
    },
    {
      dataField:'cattype',
      title:'Category',
      type:'',
      format:''
    },
    {
      dataField:'priority',
      title:'Priorite',
      type:'',
      format:''
    },
    {
      dataField:'status',
      title:'Status',
      type:'',
      format:''
    },
    {
      dataField:'Assigneddate',
      title:'Assigned date',
      type:'date',
      format:'dd MMM yyyy hh:mm a'
    },
  ];
  showFilterRow:boolean=false;
  excel_permisson: number = 0;

  constructor( private matDialog: MatDialog ,  private ticketingservice :  TicketingService,
    authService : AuthenticationService ) {
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
   }

  ngOnInit() {
    this.dataList = [{ticketNo: 1 , Category:1 ,Description: 'need your help', cattype : 'College', priority: 'high',statusId:1 , status : 'open' ,Assigneddate: '10/07/1993' ,Assignedto : 'user 1' , assigneID: 1},
    {ticketNo: 2 , Description: 'need your help',  Category:2 ,  cattype : 'student', priority: 'medium' , status : 'close' , statusId: 2 , Assigneddate: '10/07/1992' , Assignedto: 'user 2' , assigneID: 2}];
  }

  add() {
    this.edit({ticketNo: 0});
  }

  edit(ticket?: any) {
    this.matDialog.open(AddTicketComponent, { data: ticket,width:'50%' ,minWidth:'300px' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      //this.list();
    });
  }

  delete(role: any) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      // if (res) {
      //   .delete(role.RoleId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      //     this.list();
      //   });
      // }
    });
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
