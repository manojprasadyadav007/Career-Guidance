import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment';
import { Login } from 'app/models/login.model';
import { StudentDocumentService } from 'app/services/student-document.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'app/services/authentication.service';
import { MiscService } from 'app/services/misc.service';
import { UploadDocumentsComponent } from '../upload-documents/upload-documents.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { InputBoxDialogComponent } from 'app/utility/input-box-dialog/input-box-dialog.component';
import { ToasterService } from 'angular2-toaster';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-display-documents-local',
  templateUrl: './display-documents-local.component.html',
  styleUrls: ['./display-documents-local.component.scss']
})
export class DisplayDocumentsLocalComponent implements OnInit,OnDestroy {

  @Input()
  parentId: number;

  @Input()
  parentType: number;

  @Input()
  permission: number;

  @Input()
  requiredDocumentList: any[];

  @Output()
  onDocumentChange: EventEmitter<any> = new EventEmitter();

  @Output()
  onArrayUpdate: EventEmitter<any> = new EventEmitter();

  @Output()
  onPendingDocumentUpdate: EventEmitter<string[]> = new EventEmitter();
  
  showVerification: boolean = false;

  dataList: any[] = [];
  private onDestroy$: Subject<void> = new Subject<void>();


  columns: any[] = [
    { dataField: 'DocumentName', title: 'Attachment', type: '', format: '' },
    { dataField: 'DocumentStatusName', title: 'Status', type: '', format: '' }
  ];

  showFilterRow: boolean = false;

  displayDocList: any[];

  documentList: any[];

  filepath: string = environment.filepath;

  user: Login;

  uploadDir: string = 'student';

  taskFiles: any[];
  excel_permisson: number = 0;

  constructor(private studentDocumentService: StudentDocumentService,
    private matDialog: MatDialog,
    authService: AuthenticationService,
    private miscService: MiscService,
    private toasterService: ToasterService) {
    this.user = authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }


  ngOnInit() {
    this.miscService.document(this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.documentList = res;
      if (this.documentList) {
        if (!this.requiredDocumentList) {
          this.requiredDocumentList = this.documentList.filter(d => d.required);
        }

        if ((+this.parentType === 9)) {

          this.requiredDocumentList = this.documentList.filter(d => d.required);
          this.uploadDir = 'agent';
          this.showVerification = true;
        }
        if (+this.parentType === 7) {
          this.showVerification = true;
        }
        this.list();
      }

    });
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {

    if (changes['requiredDocumentList'] && changes['requiredDocumentList'].previousValue != changes['requiredDocumentList'].currentValue) {
      this.getDisplayDocList();
    }
  }

  list() {

    this.getDisplayDocList();

  }

  updateDocument(DocumentTypeId?: number, documentId?: number) {
    this.matDialog.open(UploadDocumentsComponent, { data: { uploaddir: this.uploadDir, documentList: this.documentList, DocumentTypeId: DocumentTypeId } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.toasterService.pop("success", "Document saved successfully");
        this.dataList.push({
          DocPath: res.DocPath,
          DocumentTypeId: res.DocumentTypeId
        });

        this.getDisplayDocList();

        this.onArrayUpdate.emit(this.dataList);

      }
    });
  }

  delete(documentId) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.studentDocumentService.delete(documentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.dataList = this.dataList.filter((d) => d.DocumentTypeId != documentId);
            this.toasterService.pop("success", "Document deleted successfully");
            this.list();
            this.onArrayUpdate.emit(this.dataList);
            this.onDocumentChange.emit(true);
          }
        });
      }
    });
  }


  getDocumentStatusName(doc?: any) {
    if (doc.DocPath) {
      return 'Uploaded';
    }
    else {
      return 'Pending';
    }
  }

  getDocumentName(documentId) {
    return this.documentList.filter((d) => d.DocumentTypeId === documentId);
  }

  getDisplayDocList() {

    this.displayDocList = [];

    if (this.requiredDocumentList) {
      let pendingDoc: string[] = [];
      this.requiredDocumentList.map(d => {
      let uploadDoc = this.getUploadStatus(d.DocumentTypeId);

        if (!uploadDoc) {
          pendingDoc.push(d.DocumentName);
        }

        this.displayDocList.push({
          DocumentId: uploadDoc ? uploadDoc.DocumentId : 0, DocumentName: d.DocumentName, required: true, DocumentStatus: uploadDoc ? uploadDoc.DocumentStatus : 0, DocPath: uploadDoc ? uploadDoc.DocPath : '',
          ReviewRemark: uploadDoc ? uploadDoc.ReviewRemark : '', AddStamp: uploadDoc ? uploadDoc.AddStamp : '',
          DocumentTypeId: d.DocumentTypeId, DocumentStatusName: uploadDoc ? this.getDocumentStatusName(uploadDoc) : 'Pending'
        })
      });

      this.onPendingDocumentUpdate.emit(pendingDoc);

    }


    if (this.dataList) {
      this.dataList.forEach(element => {
        if (this.displayDocList.findIndex(d => d.DocumentTypeId === element.DocumentTypeId) >= 0) {
          return;
        }
        let documentName = this.getDocumentName(element.DocumentTypeId);

        this.displayDocList.push({
          DocumentId: element.DocumentTypeId, DocumentName: documentName[0].DocumentName, required: false, DocumentStatus: element.DocumentStatus, DocPath: element.DocPath,
          ReviewRemark: element.ReviewRemark, AddStamp: element.AddStamp,
          DocumentTypeId: element.DocumentTypeId,
          DocumentStatusName: this.getDocumentStatusName(element)
        });
      });
    }
  }
  getUploadStatus(docTypeId: number) {
    if (this.dataList) {
      return this.dataList.filter(d => d.DocumentTypeId === docTypeId)[0];
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
        if ( res !== false) {
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
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
