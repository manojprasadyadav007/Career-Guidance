import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { InstituteService } from 'app/services/institute.service';
import { ToasterService } from 'angular2-toaster';
import { InstCountryService } from 'app/services/inst-country.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStatusDialogComponent } from '../add-status-dialog/add-status-dialog.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap  } from 'app/models/site-map.model';

@Component({
  selector: 'app-application-flow',
  templateUrl: './application-flow.component.html',
  styleUrls: ['./application-flow.component.scss']
})
export class ApplicationFlowComponent implements OnInit, OnDestroy {
  @Input()
  InstitutionId: number;

  @Input()
  permission: number;

  countryId: number;
  flagdisabled:boolean =false;
  flowListData: any[] = [];

  statusList: any[];
  regionFilter:any='';
  countryList: any[];

  private onDestroy$: Subject<void> = new Subject<void>();

  mainStatusList:any[];

  currentUser: Login;

  constructor(private instituteService: InstituteService,
    private toasterService: ToasterService,
    private instituteCountryService: InstCountryService,
    private matDialog: MatDialog,
    private authService:AuthenticationService
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();

    
   }

  ngOnInit() {
    if(this.currentUser.RoleType === 2) {
      this.InstitutionId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Application_Flow);
    }

    // get institution available region
    this.instituteCountryService.list(this.InstitutionId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
      });
      this.getStatus();
  }

  get() {
    this.flowListData = [];
    this.removeUsedStatus();
    if (this.countryId != null) {
      this.instituteService.getFlow(this.InstitutionId, this.countryId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res.length > 0) {
            this.flowListData = res;
             this.removeUsedStatus(); 
          }
          else if (this.statusList.length > 0) {
            this.flowListData = [
              { FlowTitle: 'Untitled 1', data: [] }
            ];
          }
        });
    }
  }
 
  removeUsedStatus() {
    
    var statusIds = [];
    if(this.flowListData)
    {
      this.flowListData.forEach(element => {
        element.data.forEach(d => {
          statusIds.push(d.value);
        })
      });
    }

    if (statusIds.length > 0) {
      this.statusList = this.mainStatusList.filter(element =>
        !statusIds.includes(+element.value)
      );
    }
    else{
      this.statusList = Object.assign(this.statusList,this.mainStatusList);
    }
  }

  getStatus() {
    this.statusList = [];
    this.mainStatusList=[];

      this.instituteService.applicationStatus(this.InstitutionId, 0)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.mainStatusList = res;
          this.removeUsedStatus();
        });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addFlow() {
    this.flowListData.push({ FlowTitle: 'Untitled ' + (this.flowListData.length + 1), data: [] });
  }

  removeFlow(index: number) {
    this.statusList = this.statusList.concat(this.flowListData[index].data).sort((a, b) => {
      return a.value > b.value ? 1 : -1;
    });
    this.flowListData.splice(index, 1);
  }

  update() {
    var flow = [];
    this.flagdisabled =true;
    this.flowListData.forEach((element, ei) => {
      element.data.forEach((d, i) => {
        flow.push({ FlowName: ei + 1, StepId: d.value, StepIndex: i, FlowTitle: element.FlowTitle });
      })
    });
      if(flow.length <=0 ){
        flow.push({FlowName:null , StepId: null, StepIndex: null, FlowTitle: null})
      }
    this.instituteService.updateFlow(this.InstitutionId, this.countryId, flow)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop('success', 'Application flow updated successfully');
        this.flagdisabled =false;
      }, err =>{
        this.flagdisabled =false;
      });
  }

  addStatus() {
    var statusIds = [];
    if(this.flowListData)
    {
      this.flowListData.forEach(element => {
        element.data.forEach(d => {
          statusIds.push(d.value);
        })
      });
    }

    this.matDialog.open(AddStatusDialogComponent, { data: { InstitutionId: this.InstitutionId,Type:5,usedStatus:statusIds } })
      .afterClosed()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(res => {
        if (res) {
            this.getStatus();
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
