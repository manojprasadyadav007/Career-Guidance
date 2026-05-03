import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs/internal/Subject';
import { appPattern } from 'app/models/site-map.model';
import { ApplicationService } from 'app/services/application.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';


@Component({
  selector: 'app-refund-documents',
  templateUrl: './refund-documents.component.html',
  styleUrls: ['./refund-documents.component.scss']
})
export class RefundDocumentsComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();

  parentId;
  parentType;
  showRemark;
  permission;
  enableRefundDisabled = false;

  constructor(private dialogref: MatDialogRef<RefundDocumentsComponent>,
    private applicationService: ApplicationService,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) data) {

    this.parentId = data.parentId;
    this.parentType = data.parentType;
    this.showRemark = data.showRemark;
    this.permission = data.permission;
  }

  ngOnInit() {
  }
  applyforRefund() {

    this.applicationService.applyForRefund(this.parentId, 1).subscribe((res) => {
      this.toasterService.pop('success', 'Applied for Refund');
      this.dialogref.close({ status: 'Ok' });
    });

  }



  cancel() {
    this.dialogref.close();
  }


  uploadedDocument(event) {
    // if (event.documentTypeId && event.documentTypeId == 41 && event.message === 'saved') {
    //   this.enableRefund = false
    // }
    
    // if (event.documentTypeId && event.documentTypeId == 41 && event.message === 'deleted') {
    //   this.enableRefund = true
    // }

  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
