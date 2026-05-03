import { Component, OnInit, Inject, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApplicationFeeService } from 'app/services/application-fee.service';
import { UploadService } from 'app/services/upload.service';
import { AppDefaultValue, appPattern } from 'app/models/site-map.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MiscService } from 'app/services/misc.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCreditCardInfoDialogComponent } from '../../../student-view-layout/edit-credit-card-info-dialog/edit-credit-card-info-dialog.component';
import { ToasterService } from 'angular2-toaster/src/toaster.service';

declare var StripeCheckout: any;

@Component({
  selector: 'app-application-fee-add',
  templateUrl: './application-fee-add.component.html',
  styleUrls: ['./application-fee-add.component.scss']
})
export class ApplicationFeeAddComponent implements OnInit, OnDestroy {

  formdata: any = {
    DepositId: 0,
    ApplicationId: 0,
    SemesterNo: '',
    FeeDeposit: '',
    DepositDate: '',
    ReceiptPath: '',
    FeeType: '',
    FeeBasis: '',
    ReceiptType: null,
    PaymentMode: null
  };

  ccInfo: any;

  receiptTypeList: any = [];
  flagdisable: boolean = false;
  typeFilter: any = '';
  basicFilter:any = '';
  todayDate: Date = new Date();

  receiptFile: File;

  feeTypeList = AppDefaultValue.appFeeType;
  feeBasisList=AppDefaultValue.appFeeBasis;
  btnLabel: string = 'Submit';

  permission: number = 0;

  currency: string = '$';

  receiptFilter: String = '';

  applicationFeeShowCallback: any;

  @Output()
  onUpdate: EventEmitter<any> = new EventEmitter();

  feeList: any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  modelPattern=appPattern;

  showStripe = false;
  responseFromStripe: any;
  handler: any;
  constructor(@Inject(MAT_DIALOG_DATA) data,
    private applicationFeeService: ApplicationFeeService,
    private matDialogRef: MatDialogRef<ApplicationFeeAddComponent>,
    private uploadService: UploadService,
    private miscservice: MiscService,
    private matDialog: MatDialog,
    private toasterService: ToasterService
  ) {
    this.formdata.ApplicationId = data.ApplicationId;
    this.formdata.DepositId = data.DepositId | 0;
    this.permission = data.permission | 0;
    this.currency = data.currency;
    this.ccInfo = data.ccInfo;
    this.applicationFeeShowCallback = data.callback;

    if (data.feeList) {
      this.feeList = data.feeList;

      this.feeTypeList = this.feeList.map(d => d.FeeType);
      if (this.formdata.DepositId === 0 && this.feeTypeList.length === 1) {
        this.formdata.FeeType = this.feeTypeList[0];
        this.onFeeTypeChange();
      }
    }
    if (data.ccInfo) {
      this.ccInfo = data.ccInfo;
    }
  }

  ngOnInit() {
    if (this.formdata.DepositId > 0) {
      this.applicationFeeService.get(this.formdata.DepositId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        let tempapplicationid = this.formdata.ApplicationId;
        this.formdata = res;
        this.formdata.ApplicationId = tempapplicationid;
        this.btnLabel = 'Update';
      });
    }
    this.receiptType();
  }

  checkoutStripe(e) {
    this.handler.open({
      name: 'MSM',
      description: 'Education and more ..',
      email: 'support@msquaremedia.com'
    });
    e.preventDefault();
  }

  receiptType() {
    this.miscservice.receiptTypeList().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.receiptTypeList = res;
    });
  }

  feeAdd(form?: NgForm) {

    if (form) {
      if (form.invalid) {
        return;
      }
    }
    this.flagdisable = true;
    if (this.receiptFile != undefined) {
      this.uploadService.uploadFileWithoutProgress('student', this.receiptFile).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata.ReceiptPath = res[0];
        this.receiptFile = undefined;
        this.feeAdd();
      },
        err => {
          this.receiptFile = undefined;
          this.feeAdd();
        }
      );
      return;
    }
    if (this.formdata.DepositId > 0) {
      this.applicationFeeService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success","Fee updated successfully");

        this.matDialogRef.close(true);

      }, err => {
        this.flagdisable = false;
      })
    }
    else {
      this.applicationFeeService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "Fee saved successfully");

        this.matDialogRef.close(true);
      }, err => {
        this.flagdisable = false;
      })
    }

  }

  onPaymentMethodChange() {

    if (this.formdata.PaymentMode === 'Credit Card') {
      if (this.ccInfo) {
        if (this.ccInfo.CCType) {
          return;
        }
      }

      this.matDialog.open(EditCreditCardInfoDialogComponent, { data: { parentId: this.formdata.ApplicationId , parentType: 7, permission: this.permission } })
        .afterClosed()
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.applicationFeeShowCallback(res);
            this.onUpdate.emit('ccInfo');
          } 
        });
    }
  }

  onFeeTypeChange() {
    var data = this.feeList.filter(d => d.FeeType === this.formdata.FeeType);

    if (data && data.length > 0) {
      this.formdata.FeeDeposit = data[0].FeeAmount;
    }

    if(this.formdata.FeeDeposit > 0) {
      this.showStripe = true;
      // Code for Stripe Legacy
      this.handler = StripeCheckout.configure({
        key: 'pk_test_51Iag9FSHC7g52UTA3WAH4sEHijZScOJVmrDtYiiYWMOn7Nu3c8caGxwIDcUlQb3uqfnyFKnHfm3xgCu5Va1tSGD000g6se9AtP',
        image: 'assets/img/MyMSM_logo_1.png',
        locale: 'auto',
        source: async (source) => {
          this.miscservice.payStripeLegacy((this.formdata.FeeDeposit * 100), 'inr', source.id , this.formdata.FeeType).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.responseFromStripe = res;
            if(this.responseFromStripe.status) {
              if(this.responseFromStripe.status === 'succeeded') {
                this.toasterService.pop("success", "Payment Successful");
                this.showStripe = false;
              } else {
                this.toasterService.pop("error", this.responseFromStripe.failure_message);
              }
            } else {
              this.toasterService.pop("error", this.responseFromStripe.Message);
            }
          });
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
