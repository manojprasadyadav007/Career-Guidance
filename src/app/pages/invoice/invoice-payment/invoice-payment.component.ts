import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { InvoicePaymentService } from 'app/services/invoice-payment.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';

@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
  styleUrls: ['./invoice-payment.component.scss']
})
export class InvoicePaymentComponent implements OnInit , OnDestroy {

  // paymentList: MatTableDataSource<any>;
  // columnToDisplay: string[] = ['Date', 'Amount', 'Remark', 'Action'];
  dataList =[];
  columns:any[]=[
    {dataField:'PaymentDate', title:'Date',type:'date',format:'dd MMM yyyy'},
    {dataField:'PaidAmount', title:'Amount',type:'',format:'#.##'},
    {dataField:'PaymentRemark', title:'Remark',type:'',format:''},
  ];
  showFilterRow:boolean=false;
  gridMessage: string = 'No data';
  private onDestroy$: Subject<void> = new Subject<void>();
  formdata: any = { PaymentDate: '', PaidAmount: '', PaymentRemark: '', InvoiceId: 0 }
  isChange: boolean = false;
  invoice: any = {};
  todayDate: Date = new Date();
  currentUser: Login;
  excel_permisson: number = 0;

  constructor(private invoicePaymentService: InvoicePaymentService,
    @Inject(MAT_DIALOG_DATA) data,private authService: AuthenticationService
  ) {
    this.invoice = data.Invoice;
    this.currentUser = authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.listPayment(false);
  }

  paymentAdd(form:NgForm) {

    if(form.invalid)
    {
      return;
    }

    this.invoicePaymentService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.invoice.DueAmount=(this.invoice.DueAmount-this.formdata.PaidAmount);
      this.listPayment(true,form);
    })
  }

  paymentDelete(payment: any) {
    this.invoicePaymentService.delete(payment.PaymentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.invoice.DueAmount=(this.invoice.DueAmount+payment.PaidAmount);
      this.listPayment(true);
    });
  }

  listPayment(change: boolean,form?:NgForm) {
    this.isChange = change;
    this.formdata = {
      PaymentDate: '',
      PaidAmount: '',
      PaymentRemark: '',
      InvoiceId: this.invoice.InvoiceId,
    }
    if(form)
    {
      form.resetForm();
    }
    this.gridMessage = 'Loading';
    this.invoicePaymentService.list(this.formdata.InvoiceId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.dataList = res;
      this.gridMessage = 'No data';
     // this.paymentList = new MatTableDataSource(res);
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
