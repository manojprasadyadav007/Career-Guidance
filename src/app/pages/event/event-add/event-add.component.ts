import { Component, OnInit, Inject, OnDestroy, ViewChild } from "@angular/core";
import { EventService } from "app/services/event.service";
import { appPattern, sitemap, editorlist } from "app/models/site-map.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthenticationService } from "app/services/authentication.service";
import { InstCountryService } from "app/services/inst-country.service";
import { UserService } from "app/services/user.service";
import { Login } from "app/models/login.model";
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { ToasterService } from "angular2-toaster";
import { DomSanitizer } from '@angular/platform-browser';
import { EventCategoryService } from '../../../services/event-category.service';
import { InstituteService } from "app/services/institute.service";
@Component({
  selector: "app-event-add",
  templateUrl: "./event-add.component.html",
  styleUrls: ["./event-add.component.scss"],
})
export class EventAddComponent implements OnInit, OnDestroy {
  formdata: any;
  btnLabel: String = "Add";
  categoryList: any[];
  categoryFilter: any[];
  instituteFilter: any = '';
  institutionList: any[];
  modelPattern = appPattern;
  institutionId: number;
  regionList: any[];
  ownerFilter: any = "";
  regionFilter: any = "";
  permission: number = 0;
  flagdisabled = false;
  tabIndex: number = 0;
  popupVisible: boolean;
  userList: any[];
  items: any = Object.assign([], editorlist);
  minEndHours: number = 0;
  parentName='Event';
  disabledValue: boolean = false;
  @ViewChild('eventform', { static: true }) form: NgForm;
  currentUser: Login;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private instEventService: EventService,
    private dialogRef: MatDialogRef<EventAddComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    authService: AuthenticationService,
    private instCountryService: InstCountryService,
    private userService: UserService,
    private toasterService: ToasterService,
    private DomSanitizer: DomSanitizer,
    private eventcategory: EventCategoryService,
    private instService:InstituteService,
  ) {
    if (data.readyOnly) {
      this.disabledValue = true;
    }
    this.formdata = {
      EventId: data.EventId | 0,
      ParentId: data.ParentId,
      ParentType: data.ParentType,
      EventCategoryId: null,
      EventCategoryName: '',
      InstitutionId:0,
      EventType: -1,
      SessionORBranding: 1,
      EventDescription: "",
      EventDescriptionPreview: "",
      StartDate: "",
      EndDate: "",
      RegionId: 0,
      EventOwner: authService.currentUserSubject.getValue().UserId,
      StartHours: null,
      StartMinutes: null,
      EndHours: null,
      EndMinutes: null,
      EventTitle: null,
    };
    this.permission = data.permission | 0;
    this.institutionId = data.InstitutionId;

    if (this.permission === 0) {
      if (this.formdata.ParentType === 1) {
        this.permission = authService.checkPermission(sitemap.Institutions);
      } else if (this.formdata.ParentType === 3) {
        this.permission = authService.checkPermission(sitemap.Campaign);
      }else if(this.formdata.ParentType === 2){
        this.permission = authService.checkPermission(sitemap.Marketing_Event);
      }

    }

    this.currentUser = authService.currentUserSubject.getValue();

    this.fillRegion();
    this.fillCategory();
    this.fillInstitution();
    this.get();
    if (data.EventId) {
      this.btnLabel = "Update";
    }
  }

  ngOnInit() {
    this.items.push({
      text: "Show markup",
      stylingMode: "text",
      onClick: () => (this.popupVisible = true),
    });
    this.userService
      .forDDL("", "", 0)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        this.userList = res;
      });
      if(this.formdata.ParentType === 2){
        this.formdata.EventType = 0;
      }
  }

  save(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.flagdisabled = true;

    if (this.formdata.EventId != 0) {
      this.instEventService
        .update(this.formdata)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          (res) => {
            this.dialogRef.close(true);
          },
          (err) => {
            this.flagdisabled = false;
          }
        );
    } else {
      this.instEventService
        .add(this.formdata)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          (res) => {
            this.dialogRef.close(true);
          },
          (err) => {
            this.flagdisabled = false;
          }
        );
    }
  }

  get() {
    if (this.formdata.EventId > 0) {
      let vidioFrame;
      this.instEventService
        .get(this.formdata.EventId)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((res) => {
          this.formdata.EventType = res.EventType;
          this.formdata.StartDate = res.StartDate;
          this.formdata.EndDate = res.EndDate;
          this.formdata.EventDescriptionPreview = this.DomSanitizer.bypassSecurityTrustHtml(
            res.EventDescription);
          this.formdata.EventDescription = res.EventDescription;
          this.formdata.RegionId = res.RegionId;
          this.formdata.EventCategoryId = res.EventCategoryId;
          this.formdata.InstitutionId = res.InstitutionId;
          this.formdata.SessionORBranding = +res.SessionORBranding;
          this.formdata.AudienceCount = res.AudienceCount;
          this.formdata.EventOwner = res.EventOwner;
          this.formdata.StartHours = res.StartHours;
          this.formdata.StartMinutes = res.StartMinutes;
          this.formdata.EndHours = res.EndHours;
          this.formdata.EndMinutes = res.EndMinutes;
          this.formdata.EventTitle = res.EventTitle;

        });
    }
  }

  fillRegion() {
    if(this.institutionId){
      this.instCountryService
      .list(this.institutionId)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        this.regionList = res;
      });
    } 
  }

  fillCategory(){
    this.eventcategory.list().pipe(takeUntil(this.onDestroy$))
    .subscribe((res) => {
      this.categoryList = res;
    });
  }

  fillInstitution() {
    this.instService.forDDLBYPartnerType(0).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.institutionList = res;
    })
  }

  

  getEndMinHours() {
    try {
      return new Date(this.formdata.StartDate).getTime() ===
        new Date(this.formdata.EndDate).getTime()
        ? +this.formdata.StartHours
        : 0;
    } catch (e) {
      return 0;
    }
  }

  getMinEndMinute() {
    try {
      return new Date(this.formdata.StartDate).getTime() ===
        new Date(this.formdata.EndDate).getTime() &&
        this.formdata.StartHours === this.formdata.EndHours
        ? +this.formdata.StartMinutes + 1
        : 0;
    } catch (e) {
      return 0;
    }
  }

  ngAfterContentChecked() {
    if (this.permission <= 1) {
      this.form.form.disable();
    }
  }


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
