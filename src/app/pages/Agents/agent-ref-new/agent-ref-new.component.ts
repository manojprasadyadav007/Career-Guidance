import { Component, OnInit, OnChanges, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { AgentRefService } from 'app/services/agent-ref.service';
import { ToasterService } from 'angular2-toaster';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { AddAgentRefNewComponent } from './add-agent-ref-new/add-agent-ref-new.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-agent-ref-new',
  templateUrl: './agent-ref-new.component.html',
  styleUrls: ['./agent-ref-new.component.scss']
})
export class AgentRefNewComponent implements OnInit , OnDestroy{

  // columnToDisplay: string[] = ['Name', 'Position', 'Institution', 'Email', 'ContactNo','Remark','Status' ,'Action'];
  // contactList: MatTableDataSource<any>;
  dataList:any[];
  columns:any[]= [
    { dataField:'Name', title:'Name', type:'', format:'' },
    { dataField:'Designation', title:'Position', type:'', format:'' },
    { dataField:'Institution', title:'Institution', type:'' , format:'' },
    { dataField:'Email', title:'Email', type:'', format:'' },
    { dataField:'RefResponse', title:'Response', type:'' , format:'' },
    { dataField:'PhoneNo', title:'Phone Number', type:'' , format:'' },
    { dataField:'Remark', title:'Remarks', type:'' , format:'' },
  ];
  showFilterRow:boolean=false;
  gridMessage: string = 'No data';
  @Input()
  agentId: number = 0;

  @Input()
  parentName: '';

  @Input()
  can_add:boolean=false;

  @Input()
  can_delete:boolean=false;

  currentUser:Login;
  private onDestroy$: Subject<void> = new Subject<void>();
  messageTitle:string='Reference';
  @Input() referenceInfo:string;
  excel_permisson: number = 0;

  constructor(
    private matDialog: MatDialog,
    private authService:AuthenticationService,
    private agentRefService:AgentRefService,
    private toasterService:ToasterService,
    private activityLog: ActivityLogService
    ) {
      this.currentUser = authService.currentUserSubject.getValue();
      this.excel_permisson = this.authService.checkPermission(sitemap.Excel_Export);
     }

  ngOnInit() {  
  }

  listContact() {
    this.gridMessage = 'Loading';
    this.agentRefService.list(this.agentId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.dataList = res;
        this.gridMessage = 'No data';
      //  this.contactList = new MatTableDataSource(res);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.referenceInfo !='') this.listContact(); 
  }

  deleteContact(agentRef: any) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
           this.agentRefService.delete(agentRef.RefId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
             this.toasterService.pop('success',this.messageTitle+' deleted successfully');
            this.listContact();
           });
      }
    });
  }

  addContact(refId?:number) {
    this.matDialog.open(AddAgentRefNewComponent,
      { data: { agentId: this.agentId,refId:refId , 
        permission: this.addAgentRefNewPermission()
      } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.toasterService.pop('success',this.messageTitle+' '+(refId ? 'updated successfully': 'saved successfully'));
          this.listContact();
        }
      });
  }

  addAgentRefNewPermission() {
    if(this.can_delete)
        return 3;
    else if(this.can_add)
       return 2;
    else 
       return 1;    
  }

  onStatusChange(event:any,agentRef:any)
  {
      if(agentRef.RefId)
      {
        var status = (event.checked ? 1 : 0);
          this.agentRefService.statusUpdate(agentRef.RefId,status).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
              this.toasterService.pop('success','Status updated successfully');
              this.listContact();
          });
      }
  }

  activitylog(){
    this.activityLog.activitylog(this.agentId, this.parentName, 'Reference Export').pipe(takeUntil(this.onDestroy$)).subscribe();
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

