import { Component, OnInit, Input, OnDestroy ,Output, EventEmitter,} from '@angular/core';
import { ApplicationFeeService } from 'app/services/application-fee.service';
import { environment } from 'environments/environment';
import { ApplicationFeeAddComponent } from '../application-fee-add/application-fee-add.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { EditCreditCardInfoDialogComponent } from 'app/pages/student-view-layout/edit-credit-card-info-dialog/edit-credit-card-info-dialog.component';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { sitemap } from 'app/models/site-map.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-application-fee-show',
  templateUrl: './application-fee-show.component.html',
  styleUrls: ['./application-fee-show.component.scss']
})
export class ApplicationFeeShowComponent implements OnInit , OnDestroy {

  @Input()
  ApplicationId:number=0;

  @Input()
  parentName: '';

  // columnToDisplay:string[]=['DepositDate','FeeType','Amount','PaymentMode','Attachment','Action'];
  // data:MatTableDataSource<any>;
  dataList:any[];
  columns:any[]= [
    { dataField:'DepositDate', title:'Deposit Date', type:'date', format:'dd MMM yyyy' },
     { dataField:'FeeType', title:'Fee Type', type:'', format:'' },
     { dataField:'FeeDeposit', title:'Amount', type:'' , format:'' },
     { dataField:'FeeBasis', title:'Basis', type:'', format:'' },
     { dataField:'PaymentMode', title:'Mode Of Payment ', type:'' , format:'' },
     { dataField:'RecTypeName', title:'Receipt Type ', type:'' , format:'' },

  ];
  showFilterRow:boolean=false;

  filePath:string=environment.filepath;
  private onDestroy$: Subject<void> = new Subject<void>();
  @Input()
  permisssion:number=0;

  @Input()
  currency:string=''

  @Input()
  feeList:any[];

  @Input()
  ccInfo: any;

  @Input()
  showCard:boolean=true;

  @Output()
  ccInfoUpdate: EventEmitter<any> = new EventEmitter();
  excel_permisson: number = 0;

  constructor(private applicationFeeService:ApplicationFeeService
    ,private matDialog:MatDialog,
    private toasterService: ToasterService,
    authService : AuthenticationService,
    private activityLog: ActivityLogService
    ) { 
      this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {
    this.list();
  }

  list()
  {
      this.applicationFeeService.list(this.ApplicationId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.dataList = res;
        // this.data = new MatTableDataSource( res);
      });
  }
  delete(DepositId:number)
  {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(delres=>{
        if(delres)
        {
          this.applicationFeeService.delete(DepositId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
            this.toasterService.pop("success","Fee deleted successfully");
            this.list();
          });
        }
    });
  }

  add(data?:any) {
    var depositList = this.dataList.map(d=> d.FeeType);

    var tempFeeList=this.feeList.filter(d=>d.FeeAmount>0);

    var oneTimeFee = tempFeeList.filter(d=> d.FeeType==='Application Fee' && !depositList.includes(d.FeeType));

    if(oneTimeFee && oneTimeFee.length>0 )
    {
        tempFeeList = oneTimeFee;
    }
    else{
      tempFeeList = tempFeeList.filter(d=> d.FeeBasis!='one-time' || !depositList.includes(d.FeeType));
    }

    if(data && !tempFeeList.find(d=> d.FeeType===data.FeeType))
    {
        tempFeeList.push(this.feeList.find(d=>d.FeeType===data.FeeType));
    }

    var DepositId;

    if(data)
    {
      DepositId = data.DepositId;
    }
  
    

    this.matDialog.open(ApplicationFeeAddComponent,
      { data: { ApplicationId: this.ApplicationId,DepositId:DepositId,permission:this.permisssion,currency:this.currency,
        feeList:tempFeeList , ccInfo: this.ccInfo, callback: this.applicationFeeAddCallback
      }, width: '500px' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(
        res => {
          if (res) {
            this.list();
          }
        });
  }
  
  private applicationFeeAddCallback = (event: any) => {
    this.ccInfoUpdate.emit(event); 
  } 

  activitylog(){
    this.activityLog.activitylog(this.ApplicationId, this.parentName, 'Fee Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
