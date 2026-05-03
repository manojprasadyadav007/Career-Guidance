import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StatusService } from 'app/services/status.service';
import { MAT_DIALOG_DATA,  MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { sitemap } from 'app/models/site-map.model';


@Component({
  selector: 'app-add-status-dialog',
  templateUrl: './add-status-dialog.component.html',
  styleUrls: ['./add-status-dialog.component.scss']
})
export class AddStatusDialogComponent implements OnInit, OnDestroy {

  formdata: any = {
    StatusId: null,
    StatusName: null,
    OutCome: null,
    VisiblityStatus: null,
  };

  institutionId: number = 0;
  type: number = 0;
  flagdisabled:boolean = false;
  isChange: boolean = false;

  dataList: any[];
  columns: any[] = [
    {
      dataField: 'StatusName',
      title: 'Status',
      type: '',
      format: ''
    },
    {
      dataField: 'OutCome',
      title: 'Outcome',
      type: '',
      format: ''
    },
    {
      dataField: 'VisibleTo',
      title: 'Visible To',
      type: '',
      format: ''
    }
  ];
  showFilterRow: boolean = false;
  gridMessage: string = 'No data';
  usedStatus:any[];

  currentUser: Login;

  private onDestroy$: Subject<void> = new Subject<void>();

  showForm:boolean=false;
  excel_permisson: number = 0;

  constructor(private statusService: StatusService,
    @Inject(MAT_DIALOG_DATA) data,
    private toasterService: ToasterService,
    authService: AuthenticationService,
    private matDialog:MatDialog
  ) {
    this.institutionId = data.InstitutionId | 0;
    this.type = data.Type | 0;
    this.usedStatus = data.usedStatus;
    this.currentUser = authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);

  }

  ngOnInit() {
    this.list()
  }

  submitform(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.flagdisabled = true;
    this.formdata.Type = this.type;
    this.formdata.InstitutionId = this.institutionId;

    if (this.formdata.StatusId) {
      this.statusService.update(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.toasterService.pop('success','Status updated successfully');
            this.isChange = true;
            this.flagdisabled = false;
            this.resetForm(form);
            this.list();
            //this.dialogRef.close(res);
          }
        }, err=>{
          this.flagdisabled = false;
        });
    }
    else {
      this.statusService.add(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.toasterService.pop('success', 'Status saved successfully');
            this.isChange = true;
            this.flagdisabled = false;
            this.resetForm(form);
            this.list();
            //this.dialogRef.close(res);
          }
        },err=>{
          this.flagdisabled = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  resetForm(form?: NgForm) {
    this.formdata = {
      StatusId: null,
      StatusName: null,
      OutCome: null,
      VisiblityStatus: null,
    };
    if (form) {
      form.resetForm(this.formdata);
    }
    this.showForm=false;
  }

  list() {
    this.gridMessage = 'Loading';
    this.statusService.list(this.type, this.institutionId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList = res;
        this.gridMessage = 'No data';
      });
  }

  delete(value: number) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed()
    .pipe(takeUntil(this.onDestroy$)).subscribe(resConfirm=>{
        if(resConfirm)
        {
          if(this.usedStatus && this.usedStatus.length>0)
          {
             if(this.usedStatus.findIndex(d=>d===value)>=0)
             {
                this.toasterService.pop('error','Status used in flow');
                return;
             }
          }

          this.statusService.delete(this.type, value)
          .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              this.toasterService.pop('success','Status deleted successfully');
              this.isChange = true;
              this.resetForm();
              this.list();
          });

        }
    });
  }

  edit(value: number) {
    this.statusService.get(this.type, value)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
        this.showForm=true;
      });
  }

  add(form: NgForm) {
    this.resetForm(form);
    this.showForm=true;
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

}
