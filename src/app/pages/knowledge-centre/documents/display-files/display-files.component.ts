import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment';
import { Login } from 'app/models/login.model';
import { StudentDocumentService } from 'app/services/student-document.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'app/services/authentication.service';
import { MiscService } from 'app/services/misc.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { InputBoxDialogComponent } from 'app/utility/input-box-dialog/input-box-dialog.component';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-display-files',
  templateUrl: './display-files.component.html',
  styleUrls: ['./display-files.component.scss']
})
export class DisplayFilesComponent implements OnInit, OnDestroy {

  @Input()
  parentId: number;

  @Input()
  parentType: number;

  @Input()
  parentName: '';

  @Input()
  title: '';

  @Input()
  permission: number;

  @Input()
  requiredDocumentList: any[];

  @Input()
  uploadDir: string;

  @Input()
  showRemark: boolean = true;
  @Output()
  onDocumentChange: EventEmitter<any> = new EventEmitter();

  @Output()
  onPendingDocumentUpdate: EventEmitter<string[]> = new EventEmitter();

  gridMessage: string = 'No data';
  showVerification: boolean = false;

  dataList: any[];



  columns: any[];

  showFilterRow: boolean = false;

  displayDocList: any[];

  documentList: any[];

  filepath: string = environment.filepath;

  user: Login;
  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private studentDocumentService: StudentDocumentService,
    private matDialog: MatDialog,
    authService: AuthenticationService,
    private miscService: MiscService,
    private toasterService: ToasterService,
    private activityLog: ActivityLogService
  ) {
    this.user = authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {

    this.columns = [
      { dataField: 'DocumentName', title: 'Attachment', type: '', format: '', visible: 'true' },
      { dataField: 'DocumentStatusName', title: 'Status', type: '', format: '', visible: 'true' },
      { dataField: 'ReviewRemark', title: 'Remark', type: '', format: '', visible: this.showRemark },
      { dataField: 'AddStamp', title: 'Date Uploaded', type: 'date', format: 'dd MMM yyyy', visible: 'true' },
      { dataField: 'UploadBy', title: 'Upload By', type: '', format: '' }
    ];

    if (+this.parentType === 9) {
      //this.documentList = AppDefaultValue.agentDocuments;
      if (this.documentList) {
        this.requiredDocumentList = this.documentList.filter(d => d.required);
      }
      this.uploadDir = 'agent';
      this.showVerification = true;
    }
    if (+this.parentType === 7) {
      this.showVerification = true;
    }
    this.list();
  }


  ngOnChanges(changes: { [propName: string]: SimpleChange }) {

    if (changes['requiredDocumentList'] && changes['requiredDocumentList'].previousValue != changes['requiredDocumentList'].currentValue) {
      this.getDisplayDocList();
    }
  }

  list() {
    this.gridMessage = 'Loading';
    this.studentDocumentService.list(this.parentId, this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.dataList = res;
      this.gridMessage = 'No data';
      this.getDisplayDocList();
    });
  }

  updateDocument(DocumentName?: string, documentId?: number) {
    this.matDialog.open(UploadFilesComponent, { data: { uploaddir: this.uploadDir, documentList: this.documentList, displayDocList: this.displayDocList, DocumentName: DocumentName } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      if (res) {
        this.studentDocumentService.add({
          ParentId: this.parentId,
          ParentType: this.parentType,
          DocPath: res.DocPath,
          DocumentId: documentId,
          DocumentName: res.DocumentName,
        }).pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
          if (!DocumentName) {
            this.toasterService.pop('success', 'Document saved successfully');
          } else {
            this.toasterService.pop('success', 'Document updated successfully');
          }
          this.list();
          this.onDocumentChange.emit(true);
        });
      }
    });
  }

  delete(documentId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.studentDocumentService.delete(documentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop('success', 'Document deleted successfully');
          this.list();
          this.onDocumentChange.emit(true);
        });
      }
    });
  }


  getDocumentStatusName(doc?: any) {
    if (!doc || !doc.DocPath) {
      return 'Pending';
    }
    else if (doc.DocumentId > 0 && !doc.DocumentStatus) {
      return 'Uploaded';
    }
    else if (doc.DocumentStatus === 2) {
      return 'Approved';
    }
    else if (doc.DocumentStatus === 3) {
      return 'Rejected';
    }
    else {
      return 'Undefined ' + doc.DocumentStatus;
    }
  }

  getStampDate(doc?:any){
    if (doc.AddStamp) {
      return doc.AddStamp;
    }
    else {
      return new Date();
    }
  }


  getDisplayDocList() {

    this.displayDocList = [];

    if (this.requiredDocumentList) {
      let pendingDoc: string[] = [];
      this.displayDocList = this.requiredDocumentList.map(d => {
        var uploadDoc = this.getUploadStatus(d.DocumentName);

        if (!uploadDoc) {
          pendingDoc.push(d.DocumentName);
        }


        return {
          DocumentId: uploadDoc ? uploadDoc.DocumentId : 0, DocumentName: d.DocumentName, required: true, DocumentStatus: uploadDoc ? uploadDoc.DocumentStatus : 0, DocPath: uploadDoc ? uploadDoc.DocPath : '',
          ReviewRemark: uploadDoc ? uploadDoc.ReviewRemark : '', AddStamp:  this.getStampDate(uploadDoc),UploadBy :  uploadDoc ? uploadDoc.UploadBy :'',
          DocumentStatusName: this.getDocumentStatusName(uploadDoc)
        }
      });

      this.onPendingDocumentUpdate.emit(pendingDoc);

    }



    if (this.dataList) {
      this.dataList.forEach(element => {
        if (this.displayDocList.findIndex(d => d.DocumentName === element.DocumentName) >= 0) {
          return;
        }

        this.displayDocList.push({
          DocumentId: element.DocumentId, DocumentName: element.DocumentName, required: false, DocumentStatus: element.DocumentStatus, DocPath: element.DocPath,
          ReviewRemark: element.ReviewRemark, AddStamp: this.getStampDate(element),UploadBy : element.UploadBy ,
          DocumentStatusName: this.getDocumentStatusName(element)
        });
      });
    }
  }
  getUploadStatus(DocumentName: string) {
    if (this.dataList) {
      return this.dataList.filter(d => d.DocumentName === DocumentName)[0];
    }
    return null;
  }

  verifyDocument(doc: any, status: number) {
    if (status === 2) {
      this.matDialog.open(ConfirmBoxComponent, { data: { content: ' Are you sure want to approve this document?' } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.studentDocumentService.statusUpdate(
            {
              DocumentId: doc.DocumentId,
              ParentId: this.parentId,
              ParentType: this.parentType,
              StatusId: status,
              Remark: ''
            }
          ).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            this.list();
          });
        }
      });
    }
    else if (status == 3) {
      this.matDialog.open(InputBoxDialogComponent, { data: { title: 'Rejection Remark', valueName: 'Remark' }, width: '80%' }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res !== false) {
          this.studentDocumentService.statusUpdate(
            {
              DocumentId: doc.DocumentId,
              ParentId: this.parentId,
              ParentType: this.parentType,
              StatusId: status,
              Remark: res
            }
          ).pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
            this.list();
          });
        }
      });
    }
  }

  downloadDocument() {
    this.studentDocumentService.downloadDocument(this.parentId, this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      var url = window.URL.createObjectURL(res);
      window.open(url);
    });
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

  activitylog(){
    this.activityLog.activitylog(this.parentId, this.parentName, this.title+' Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  downloadFile(documentId:number)
  {
    this.studentDocumentService.downloadFile(documentId,this.parentId,this.uploadDir).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      window.open(this.filepath+'download/'+res);
    });
  }

}
