import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs/internal/Subject';
import { ApplicationService } from 'app/services/application.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';


@Component({
  selector: 'app-view-refund-documents',
  templateUrl: './view-refund-documents.component.html',
  styleUrls: ['./view-refund-documents.component.scss'],
})
export class ViewRefundDocumentsComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject<void>();

  parentId;
  parentType;
  showRemark;
  permission;
  enableRefundDisabled = false;

  constructor(private dialogref: MatDialogRef<ViewRefundDocumentsComponent>,
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
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
