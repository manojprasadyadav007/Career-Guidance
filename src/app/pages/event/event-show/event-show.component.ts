import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { MatTableDataSource, MatDialog, MatPaginator } from "@angular/material";
import { EventService } from "app/services/event.service";
import { ConfirmBoxComponent } from "app/utility/confirm-box/confirm-box.component";
import { EventAddComponent } from "../event-add/event-add.component";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { Login } from "app/models/login.model";
import { AuthenticationService } from "app/services/authentication.service";
import { sitemap } from "app/models/site-map.model";
import { ActivatedRoute } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import { ActivityLogService } from "app/services/activity-log.service";
@Component({
  selector: "app-event-show",
  templateUrl: "./event-show.component.html",
  styleUrls: ["./event-show.component.scss"],
})
export class EventShowComponent implements OnInit, OnDestroy {
  dataList: any[];

  columns: any[] = [
    { dataField: "EventType", title: "Type", type: "", format: "" },
    { dataField: "Region", title: "Region", type: "", format: "" },
    {
      dataField: "startDateandTime",
      title: "Start",
      type: "date",
      format: "dd MMM yyyy hh:mm a",
    },
    {
      dataField: "endDateandTime",
      title: "End",
      type: "date",
      format: "dd MMM yyyy hh:mm a",
    },
    { dataField: "EventTitle", title: "Title", type: "", format: "" },
  ];

  // { dataField:'EventDescription', title:'Detail', type:'', format:'' },
  showFilterRow: boolean = false;
  gridMessage: string = 'No data';
  @Input()
  institutionId: number;

  @Input()
  title: '';

  @Input()
  parentId: number = 0;

  @Input()
  parentName: 'Event';

  @Input()
  parentType: number = 2;

  @Input()
  permission: number;

  currentUser: Login;
  institutionRoute: Boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;
  constructor(
    private eventService: EventService,
    private matDialog: MatDialog,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.route.data.subscribe((data: { token: string }) => {
      if (data.token) {
        if (data.token.includes("InstitutitionRoute")) {
          if (this.currentUser.RoleType === 2) {
            this.institutionRoute = true;
            this.institutionId = this.currentUser.RefId;
            this.parentId = this.currentUser.RefId;
            this.parentType = 4;
            this.permission = this.authService.checkPermission(sitemap.Events);
          }else if(this.parentType === 2){
            this.parentName = 'Event';
            this.title = '';
            this.permission = this.authService.checkPermission(sitemap.Marketing_Event);
          }
        }
      }
    });
    
    this.list();
  }

  list() {
    this.gridMessage = 'Loading';
    this.eventService
      .list(this.parentId, this.parentType)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        res.forEach((item) => {
          try {
            if (item.EventType.toLowerCase() == "event") {
              item.startDateandTime = new Date(
                item.StartDate.split("T")[0] +
                  "T" +
                  item.StartHours +
                  ":" +
                  item.StartMinutes
              );
              item.endDateandTime = new Date(
                item.EndDate.split("T")[0] +
                  "T" +
                  item.EndHours +
                  ":" +
                  item.EndMinutes
              );
            } else {
              item.startDateandTime = item.StartDate;
              item.endDateandTime = item.EndDate;
            }
          } catch (e) {}
        });
        this.dataList = res;
        this.gridMessage = 'No data';
      });
  }

  delete(EventId: number) {
    this.matDialog
      .open(ConfirmBoxComponent)
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        if (res) {
          this.eventService
            .delete(EventId)
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((res) => {
              if (res == "OK") {
                this.toasterService.pop("success", "Deleted successfully");
                this.list();
              } else {
                alert(res);
              }
            });
        }
      });
  }

  add() {
    this.matDialog
      .open(EventAddComponent, {
        data: {
          InstitutionId: this.institutionId,
          ParentId: this.parentId,
          ParentType: this.parentType,
          permission: this.permission,
        },
       // width: "50%",
       minWidth: "400px",
      })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        if (res) {
          this.toasterService.pop("success", "Saved successfully");
          this.list();
        }
      });
  }

  edit(EventId: number) {
    this.matDialog
      .open(EventAddComponent, {
        data: {
          EventId: EventId,
          InstitutionId: this.institutionId,
          ParentId: this.parentId,
          ParentType: this.parentType,
          permission: this.permission,
        },
       // width: "50%",
        minWidth: "400px",
      })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((res) => {
        if (res) {
          this.toasterService.pop("success", "Updated successfully");
          this.list();
        }
      });
  }
  
  
  activitylog(){
    this.activityLog.activitylog(this.parentId, this.parentName, this.title+' Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }
  
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: "after",
      template: "toolbarButton",
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
