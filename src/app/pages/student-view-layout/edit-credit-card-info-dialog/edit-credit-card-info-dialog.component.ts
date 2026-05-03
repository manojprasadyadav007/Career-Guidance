import { Component, OnInit, OnDestroy, AfterViewInit, Inject } from '@angular/core';
import { Login } from 'app/models/login.model';
import { appPattern } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { ApplicationCCService } from 'app/services/application-cc.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import * as CryptoJS from 'crypto-js';
import { EncryptionService } from 'app/services/encryption.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-edit-credit-card-info-dialog',
  templateUrl: './edit-credit-card-info-dialog.component.html',
  styleUrls: ['./edit-credit-card-info-dialog.component.scss']
})
export class EditCreditCardInfoDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  currentUser: Login;
  permission: number;
  ccInfoData: any;
  parentType: number;
  modelPattern = appPattern;
  title: string = 'CC information';
  parentId: number;
  minDate: any = new Date();
  key = CryptoJS.enc.Utf8.parse('7061737323313233');
  iv = CryptoJS.enc.Utf8.parse('7061737323313233');
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private applicatoinCCService: ApplicationCCService,
    authService: AuthenticationService,
    private toasterService: ToasterService,
    private matDialogRef: MatDialogRef<EditCreditCardInfoDialogComponent>,
    private encryptionService: EncryptionService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.currentUser = authService.currentUserSubject.getValue();

    this.parentId = data.parentId;
    this.permission = data.permission;
    this.parentType = data.parentType;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.get();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onCCInfoUpdate(form: NgForm) {

    if (form.valid) {
      this.ccInfoData.ApplicationId = this.parentId;

      let encryptedccInfo = {
        ApplicationId: this.parentId,
        CCType: this.ccInfoData.CCType,
        CCName: this.ccInfoData.CCName,
        CCNo: this.encryptionService.set(environment.creditCardKey, this.ccInfoData.CCNo),
        CCCode: this.encryptionService.set(environment.creditCardKey, this.ccInfoData.CCCode),
        CCExpiryDate: this.ccInfoData.CCExpiryDate,
        CCAddress: this.ccInfoData.CCAddress
      }
      this.applicatoinCCService.add(encryptedccInfo)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success',this.title+' updated successfully');
          this.matDialogRef.close(encryptedccInfo);
        });
    }
  }

  get() {
    this.applicatoinCCService.get(this.parentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.ccInfoData = res;
        this.ccInfoData.CCNo = this.encryptionService.get(environment.creditCardKey, this.ccInfoData.CCNo);
        this.ccInfoData.CCCode = this.encryptionService.get(environment.creditCardKey, this.ccInfoData.CCCode);
      }
      else {
        this.ccInfoData = {
          ApplicationId: this.parentId,
          CCType: null,
          CCNo: null,
          CCName: null,
          CCCode: null,
          CCExpiryDate: null,
          CCAddress: null
        };
      }

    });
  }

}
