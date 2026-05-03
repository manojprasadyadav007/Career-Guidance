import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs';
import { AgentWorkingInstService } from 'app/services/agent-workingInst.service';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AssociateInstitutesPopupComponent } from './associate-institutes-popup/associate-institutes-popup.component';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-associate-institutes',
  templateUrl: './associate-institutes.component.html',
  styleUrls: ['./associate-institutes.component.scss']
})
export class AssociateInstitutesComponent implements OnInit,OnDestroy {

  @Input() agentId: number = 0;
  @Input() permission: number = 0;
  @Input()
  parentName: '';
  dataList: any[];
  institutionList: any[];
  messageTitle: string = 'Institution';
  gridMessage: string = 'No data';
  isPage:boolean=false;
  showFilterRow:boolean=false;
  instFilter:string='';
  @Input() associateInstInfo:string;
  
  private onDestroy$: Subject<void> = new Subject<void>();
  columns: any[] = [
    { dataField: 'InstName', title: 'Institution', type: '', format: '' }
  ];
  excel_permisson: number = 0;

  constructor(private matDialog: MatDialog, private tosterService: ToasterService,
    private agentWorkingInstService: AgentWorkingInstService,
    private authService: AuthenticationService,
    private activityLog: ActivityLogService
  ) {
    this.permission = this.authService.checkPermission(sitemap.Institutions);
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.associateInstInfo !='') this.list(); 
  }

  // list for grid 
  list() {
    this.gridMessage = 'Loading';
    this.agentWorkingInstService.list(this.agentId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList = res;
        this.gridMessage = 'No data';
      });
  }

  openDialog() {
    this.matDialog.open(AssociateInstitutesPopupComponent, { data: { agentId: this.agentId } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res.status == 'success') {
        this.list();
      }
    });
  }

  deleteAssociateInstitute(InstitutionId) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        let params = { InstitutionId: InstitutionId, AgentId: this.agentId }
        this.agentWorkingInstService.delete(params)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            if (res) {
              this.tosterService.pop('success', 'Institute deleted successfully');
              this.list();
            }
          });
      }
    });

  }

  edit(id: number) { }

  activitylog(){
    this.activityLog.activitylog(this.agentId, this.parentName, 'Associated Institutes Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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
