import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AgentApplicationService } from 'app/services/agent-application.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { AgentEvolutionFormStatus, enumToName } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';
import { PrintComponent } from 'app/pages/print/print.component';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-show-agent-application',
  templateUrl: './show-agent-application.component.html',
  styleUrls: ['./show-agent-application.component.scss']
})
export class ShowAgentApplicationComponent implements OnInit, OnDestroy {

  // columnToDisplay: string[] = ['Institution', 'Status', 'Action'];

  // dataList: MatTableDataSource<any>;

  dataList: any[];
  columns: any[] = [
    { dataField: 'InstName', title: 'Institution', type: '', format: '' },
    // { dataField:'RegionOfMarketing', title:'Region', type:'', format:'' },
    //  { dataField:'StatusRemark', title:'Status', type:'' , format:'' },
  ];
  showFilterRow: boolean = false;
  gridMessage: string = 'No data';
  permission: number = 0;

  @Input()
  agentId: number = 0;

  @Input()
  parentName: '';

  currentUser: Login;

  @Input()
  showAddButton: boolean = true;

  @Input()
  isPage: boolean = true;

  @Input()
  cancelLink: string = '/member';

  institutionId: number = 0;
  excel_permisson:number = 0;

  agentEvolutionFormStatusList = AgentEvolutionFormStatus;

  getName = enumToName;

  @Input() evalFormInfo:string;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private matDialog: MatDialog,
    private agentApplicationService: AgentApplicationService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private activityLog: ActivityLogService
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    if (this.currentUser.RoleId === 2) {
      this.permission = 3;
    }
    else {
      this.permission = this.authService.checkPermission(sitemap.AgentEvaluationForm);
    }
    this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);

  }

  ngOnInit() {  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.evalFormInfo !='') {
      if (this.currentUser.RoleId == 2) {
        this.agentId = this.currentUser.RefId;
        this.list();
      }
      else if (this.currentUser.RoleId === 1 || this.currentUser.RoleId >= 100) {
        this.activatedRoute.paramMap
          .pipe(takeUntil(this.onDestroy$)).subscribe(param => {
            this.agentId = +param.get('id');
            this.list();
          });
      }
      else {
        this.router.navigate(['/member/unauthorized']);
      }
    }   
  }


  printApplication(id) {

    this.matDialog.open(PrintComponent, {
      data: {
        permission:this.permission,
        agentApplicationId: id,
        title : 'Evaluation Form'
      },   width: '95%',  height: '95%'
    }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  edit(id: number) {
    this.router.navigate(['/member/evaluationform/application-for-institution/edit-application/' + id], { queryParams: { returnUrl: this.cancelLink } });
  }

  print(id: number) {
    this.router.navigate(['/member/application-for-institution/generate-pdf/' + id]);
  }

  delete(id: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.agentApplicationService.delete(id)
            .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              this.list();
            });
        }
      });
  }

  add() {
    this.router.navigate(['/member/application-for-institution/add-application', this.institutionId, this.agentId], { queryParams: { returnUrl: this.cancelLink } });
  }

  list() {
    this.gridMessage = 'Loading';
    this.agentApplicationService.list(this.agentId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList = res;
        this.gridMessage = 'No data'
        // this.dataList = new MatTableDataSource(res);
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.agentId, this.parentName, 'Evaluation Form Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }
}
