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
import { ToasterService } from "angular2-toaster";
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { sitemap } from 'app/models/site-map.model';

@Component({
  selector: 'app-display-files-local',
  templateUrl: './display-files-local.component.html',
  styleUrls: ['./display-files-local.component.scss']
})
export class DisplayFilesLocalComponent implements OnInit, OnDestroy {

  @Input()
  parentId: number;

  @Input()
  parentType: number;

  @Input()
  permission: number;

  @Input()
  requiredDocumentList: any[];

  @Input()
  uploadDir: string;

  @Output()
  onDocumentChange: EventEmitter<any> = new EventEmitter();

  @Output()
  onArrayUpdate: EventEmitter<any> = new EventEmitter();

  @Output()
  onPendingDocumentUpdate: EventEmitter<string[]> = new EventEmitter();
  
  showVerification: boolean = false;

  dataList: any[] = [];


  columns: any[] = [
    { dataField: 'DocumentName', title: 'Attachment', type: '', format: '' },
    { dataField: 'DocumentStatusName', title: 'Status', type: '', format: '' },
    { dataField: 'AddStamp', title: 'Date Uploaded', type: 'date', format: 'dd MMM yyyy', visible: 'true' },
    { dataField: 'UploadBy', title: 'Upload By', type: '', format: '' }
    
  ];

  showFilterRow: boolean = false;

  displayDocList: any[];

  documentList: any[];

  filepath: string = environment.filepath;

  user: Login;


  taskFiles: any[];

  private onDestroy$: Subject<void> = new Subject<void>();
  excel_permisson: number = 0;

  constructor(private studentDocumentService: StudentDocumentService,
    private matDialog: MatDialog,
    authService: AuthenticationService,
    private miscService: MiscService,
    private toasterService:ToasterService) {
    this.user = authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }


  ngOnInit() {

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

    this.getDisplayDocList();

  }

  updateDocument(DocumentName?: string, documentId?: number) {
    this.matDialog.open(UploadFilesComponent, { data: { uploaddir: this.uploadDir, documentList: this.documentList, DocumentName: DocumentName } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.dataList = this.dataList.filter((item) => item.DocumentName !== res.DocumentName);
        this.dataList.push({
          DocPath: res.DocPath,
          DocumentName: res.DocumentName
        });
        if(!DocumentName) {
          this.toasterService.pop("success", "Document saved successfully");
        }else {
          this.toasterService.pop("success", "Document updated successfully");
        }
        this.getDisplayDocList();
        let copyDatalist = Object.assign([], this.dataList);
        copyDatalist.forEach((item)=>{
            delete item.uploadBy;
        });

        this.onArrayUpdate.emit(copyDatalist);

      }
    });
  }

  delete(documentName) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {

        this.dataList = this.dataList.filter((d) => d.DocumentName != documentName);
        this.toasterService.pop("success","Document deleted successfully");
        this.list();
        
        this.onArrayUpdate.emit(this.dataList);
      }
    });
  }
getstampDate(doc?: any){
  if (doc.DocPath) {
    return 'Uploaded';
  }
  else {
    return 'Pending';
  }

}
getStampDate(doc? : any){
  if (doc.AddStamp) {
    return doc.AddStamp;
  }
  else {
    return new Date();
  }
}

getDocumentStatusName(doc?: any) {
  if (doc.DocPath) {
    return 'Uploaded';
  }
  else {
    return 'Pending';
  }
}
  docuploadBy(doc? :any){
  
    if(doc.uploadBy === undefined){
      return  doc.uploadBy = this.user.DisplayName
    }else{
        return doc.uploadBy
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
          ReviewRemark: uploadDoc ? uploadDoc.ReviewRemark : '', AddStamp:this.getStampDate(uploadDoc) , UploadBy : this.docuploadBy(uploadDoc),
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
          ReviewRemark: element.ReviewRemark, AddStamp:this.getStampDate(element), UploadBy : this.docuploadBy(element),
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
