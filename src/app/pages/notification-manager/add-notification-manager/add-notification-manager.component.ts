import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NotificationSenderService } from 'app/services/notification-sender.service';
import { NotificationManagerService } from 'app/services/notification-manager.service';
import { Login } from 'app/models/login.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap  , editorlist, appPattern} from 'app/models/site-map.model';
import { MiscService } from 'app/services/misc.service';
import { InstituteService } from 'app/services/institute.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
import { ToasterService } from 'angular2-toaster';
@Component({
  selector: 'app-add-notification-manager',
  templateUrl: './add-notification-manager.component.html',
  styleUrls: ['./add-notification-manager.component.scss']
})
export class AddNotificationManagerComponent implements OnInit , OnDestroy {


  formdata: any = {
    NotificationId: 0,
    RegionId: null,
    InstitutionId: null,
    SenderId: null,
    SubjectLine: '',
    MessageToSend: '',
    PartnerTypeId:null,
    SendSchedule: null,
    SendFrequency: null,
    NotificationStatus: false
  }
  flagdisabled:boolean = false;
  regionFilter:any='';
  instFilter:any='';
  senderFilter:any='';
  permission: number = 0;
  modelPattern = appPattern;

  isAdd: boolean = false;

  btnLabel: string = 'Add';

  currentUser: Login;
  partnerList : any[];
  countryList: any[];

  items: any = Object.assign([], editorlist);
  cloned:any;
  partnerFilter:any =null;
  instList: any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  senderList: any[];

 itemList:any;
  constructor(private notificationSenderService: NotificationSenderService,
    private notificationService: NotificationManagerService,
    @Inject(MAT_DIALOG_DATA) data,
    private matDialogRef: MatDialogRef<AddNotificationManagerComponent>,
    authService: AuthenticationService,
    private toasterService: ToasterService,
    private miscService: MiscService,
    private instService: InstituteService,
    private mandatoryfieldCheckService : MandatoryfieldCheckService
  ) {
    this.items.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
  })
    this.currentUser = authService.currentUserSubject.getValue();
    this.permission = authService.checkPermission(sitemap.NotificationManager);
    if (data && data.NotificationId) {
      this.formdata.NotificationId = data.NotificationId;
    }
  }

  ngOnInit() {
    this.miscService.country().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res;
    });

    this.notificationSenderService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.senderList = res;
    });

    this.get();
    this.getPartnerList();
  }

  fillInstitution(reset?: boolean) {
    this.instList = [];
    if (reset) {
      this.formdata.InstitutionId = null;
    }
    if (this.formdata.RegionId) {
      this.instService.forDDLByAgentAndCountry(0, this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.instList = res;
      });
    }
  }
  getPartnerList(){
    this.miscService.ForDDLForPartner().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.partnerList = res;
    });
  }

  add(form:NgForm) {

    if(form.invalid)
    {
      this.mandatoryfieldCheckService.setinvalidFields();
      return;
    }
    this.flagdisabled =true;
    if (this.formdata.NotificationId > 0) {
      this.notificationService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "Notification updated successfully");
        this.matDialogRef.close(true);
      }, err=>{
        this.flagdisabled =false;
      });
    }
    else {
      this.notificationService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "Notification saved successfully");
        this.matDialogRef.close(true);
      },err =>{
        this.flagdisabled =false;
      });
    }
  }

  get() {
    if (this.formdata.NotificationId > 0) {
      this.notificationService.get(this.formdata.NotificationId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
        this.btnLabel = 'Update';
        this.fillInstitution();
      });
    }
  }


  onScheduleChange() {
    this.formdata.SendFrequency = null;
  }

  popupVisible: boolean;
 


    // toolbarButtonOptions :any = {
    //     text: 'Show markup',
    //     stylingMode: 'text',
    //     onClick: () => this.popupVisible = true
    // };

    ngOnDestroy(): void {
      this.onDestroy$.next();
      this.onDestroy$.complete();
    }
}
