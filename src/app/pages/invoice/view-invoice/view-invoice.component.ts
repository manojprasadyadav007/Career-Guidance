import { Component, OnInit, OnDestroy } from '@angular/core';
import {  MatDialog } from '@angular/material';
import { InvoiceService } from 'app/services/invoice.service';
import { InvoicePaymentComponent } from '../invoice-payment/invoice-payment.component';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap, enumToName, InvoiceStatus } from 'app/models/site-map.model';
import { MSMAgentService } from 'app/services/msmagent.service';
import { InstituteService } from 'app/services/institute.service';
import { InputBoxDialogComponent } from 'app/utility/input-box-dialog/input-box-dialog.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { PrintComponent } from 'app/pages/print/print.component';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit  , OnDestroy{

  // applicationList: MatTableDataSource<any>;
  // columnToDisplay: string[] = ['Number', 'Date','Status' ,'Agent', 'Institution', 'Amount', 'Paid', 'Due', 'Action'];

  dataList:any[];
  columns:any[] =  [
    { dataField:'InvoiceNo', title:'Invoice', type:'', format:'' },
     { dataField:'InvoiceDate', title:'Date', type:'date', format:'dd MMM yyyy' },
     { dataField:'InvoiceS', title:'Status', type:'', format:'' },
     //{ dataField:'Agent', title:'Agent', type:'', format:'' },
      { dataField:'InstName', title:'Institution', type:'', format:'' },
     { dataField:'InvoiceAmount', title:'Amount', type:'', format:'#.##' },
     { dataField:'PaidAmount', title:'Paid', type:'', format:'#.##' },
     { dataField:'DueAmount', title:'Due', type:'', format:'#.##' },
    ]
  showFilterRow:boolean=false;
  private onDestroy$: Subject<void> = new Subject<void>();
  formdata: any = { AgentId: 0, InstitutionId: 0 };
  gridMessage: string = 'No data';
  currentUser: Login;
  permission: number = 0;
  agentFilter:any = '';
  instituteFilter:any = '';
  agentList: any[];
  institutionList: any[];
  messageTitle: string = 'Invoice';
  getName=enumToName;
  invoiceStatusList=InvoiceStatus;

  searchModeOption: string = "contains";
  searchExprOption: any = "CompanyName";
  searchTimeoutOption: number = 200;
  minSearchLengthOption: number = 0;
  showDataBeforeSearchOption: boolean = false;
  excel_permisson: number = 0;
  // searchExprOptionItems: Array<any> = [{
  //     name: "'Name'",
  //     value: "Name"
  // }, {
  //     name: "['Name', 'Category']",
  //     value: ['Name', 'Category']
  // }]

  constructor(private invoiceService: InvoiceService, private matDialog: MatDialog,
    private authService: AuthenticationService,
    private agentService: MSMAgentService,
    private institutionService: InstituteService,
    private router:Router,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService
  ) {
    this.currentUser = authService.currentUserSubject.getValue();
    this.permission = authService.checkPermission(sitemap.InvoiceView);
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }



  ngOnInit() {
    if (this.currentUser.RoleId != 2) {
        this.fillAgent();
    }
    else{
      this.formdata.AgentId=this.currentUser.RefId;
    }
    if(this.currentUser.RoleType!=2)
    {
      this.fillInstitution();
    }

    this.columnList();

    this.list();
  }

  columnList(){
    if(this.formdata.AgentId>0){
  this.columns =  [
      { dataField:'InvoiceNo', title:'Invoice', type:'', format:'' },
       { dataField:'InvoiceDate', title:'Date', type:'date', format:'dd MMM yyyy' },
       { dataField:'InvoiceS', title:'Status', type:'', format:'' },
       { dataField:'InvoiceAmount', title:'Amount', type:'', format:'#.##' },
       { dataField:'PaidAmount', title:'Paid', type:'', format:'#.##' },
       { dataField:'DueAmount', title:'Due', type:'', format:'#.##' },
      ]
    }else if(this.currentUser.RoleType===2){
      this.columns =  [
        { dataField:'InvoiceNo', title:'Invoice', type:'', format:'' },
         { dataField:'InvoiceDate', title:'Date', type:'date', format:'dd MMM yyyy' },
         { dataField:'InvoiceS', title:'Status', type:'', format:'' },
          { dataField:'Agent', title:'Agent', type:'', format:'' },
       //   { dataField:'InstName', title:'Institution', type:'', format:'' },
         { dataField:'InvoiceAmount', title:'Amount', type:'', format:'#.##' },
         { dataField:'PaidAmount', title:'Paid', type:'', format:'#.##' },
         { dataField:'DueAmount', title:'Due', type:'', format:'#.##' },
        ]
    }
  }

  onCellPrepared (e) {
            try{
              if (e.column.caption == "Status") {
              e.cellElement.innerHTML = "<span [ngClass]='{'text-danger': '( e.data.InvoiceStatus===2 || e.data.InvoiceStatus===4)' , 'text-success':'e.data.InvoiceStatus===5','text-info':!'(e.data.InvoiceStatus===2 || e.data.InvoiceStatus===4 || e.data.InvoiceStatus===5)' }' >" + e.data.InvoiceS +" </span>" ;
              }
        }catch(e){
          
        }
  }
  list() {
    this.gridMessage = 'Loading';
    this.invoiceService.list(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      res.forEach((elem) =>{
             elem.InvoiceS = this.getName(this.invoiceStatusList, elem.InvoiceStatus);
      });
       this.dataList = res;
       this.gridMessage = 'No data';
      // this.applicationList = new MatTableDataSource(res);
    });
  }

  // doTotal(columnname: string) {

  //   if (this.dataList) {
  //     return this.dataList.reduce((accum, curr) => accum + curr[columnname], 0);
  //   }
  // }
  
  printInvoice(id) {

    this.matDialog.open(PrintComponent, {
      data: {
        invoiceId: id,
        title: 'Invoice'
      } , width: '95%',  height: '95%'
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }


  paymentInvoice(invoice) {
    this.matDialog.open(InvoicePaymentComponent, { data: { Invoice: invoice } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.list();
      }
    });
  }

  fillAgent() {
    this.agentService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.agentList = res;
    });
  }

  fillInstitution() {
    this.institutionService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.institutionList = res;
    });
  }

  updateStatus(status:number,invoiceId:number,remarkRequired?:boolean)
  {
    this.matDialog.open(ConfirmBoxComponent,{data:{content:'Are you sure want to change status'}}).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(
      res=>{
        if(res)
        {
          var rejectionRemark="";
          if(remarkRequired)
          {
             this.matDialog.open(InputBoxDialogComponent,{data:{title:'Rejection Remark',valueName:'Remark'},width:'50%',minWidth:'300px'}).afterClosed().pipe(takeUntil(this.onDestroy$))
             .subscribe(res1=>{
               if(res1 !== false)
               {
                rejectionRemark=res1;
                this.submitStatus(status,invoiceId,rejectionRemark);
               }
              //  else{
              //   this.submitStatus(status,invoiceId,rejectionRemark);
              //  }
               
             });
             return;
          }
          this.submitStatus(status,invoiceId,rejectionRemark);
        }
      }
    )
   
  }

  submitStatus(status:number,invoiceId:number,remark:string)
  {
      this.invoiceService.statusUpdate({InvoiceId:invoiceId,Status:status,Remark:remark}).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.toasterService.pop('success', this.messageTitle+' status changed successfully');
          this.list();
      });
  }

  delete(invoiceId:number)
  {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(
      res=>{
         if(res)
         {
            this.invoiceService.delete(invoiceId).pipe(takeUntil(this.onDestroy$)).subscribe(res1=>{
             this.toasterService.pop('success', this.messageTitle+' status changed successfully');
              this.list();
            });
         }
      }
    );
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
  });
  }

  activitylog(){
    this.activityLog.activitylog(0, 'Invoices', 'Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }
  

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  openInvoice(invoiceId:number)
  {
      this.router.navigate(['/member/invoice/view/'+invoiceId]);
  }
}
