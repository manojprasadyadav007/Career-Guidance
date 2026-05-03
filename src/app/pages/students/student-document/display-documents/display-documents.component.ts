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
import { UtcToLocaltimePipe } from 'app/custom-pipes/utc-to-localtime/utc-to-localtime.pipe'
import { InstitutionDocumentService } from 'app/services/institution-document.service';
import { sitemap } from 'app/models/site-map.model';
import { MSMAgentService } from 'app/services/msmagent.service';
import { CommonService } from 'app/services/common.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ActivityLogService } from 'app/services/activity-log.service';
@Component({
  selector: 'app-display-documents',
  templateUrl: './display-documents.component.html',
  styleUrls: ['./display-documents.component.scss']
})
export class DisplayDocumentsComponent implements OnInit, OnDestroy {

  @Input()
  parentId: number;

  @Input()
  instaDoc:boolean;

  @Input()
  parentName: '';

  @Input()
  title: 'Documents';

  @Input()
  instituteId: number;

  @Input()
  countryId: number;


  @Input()
  parentType: number;

  @Input()
  permission: number;

  @Input()
  requiredDocumentList: any[];

  @Input()
  addButtonRestrict = false;
  @Output()
  onDocumentChange: EventEmitter<any> = new EventEmitter();

  @Output()
  onPendingDocumentUpdate: EventEmitter<string[]> = new EventEmitter();

  @Output()
  onDocumentUpload: EventEmitter<any> = new EventEmitter();

  @Input()
  Title = '';

  @Input()
  showReceived = false;

  @Input() originDetails:any;

  @Input() docDescription:any = false;

  showVerification = false;
  gridMessage: string = 'No data';
  dataList: any[];
  @Input() documentInfo: string;

  @Input()
  showRemark = true;

  columns: any[];

  showFilterRow = false;

  displayDocList: any[];

  documentList: any[];
  documentListCopy: any[];
  showList: any[];
  receivedStatus: any = false
  filepath: string = environment.filepath;

  user: Login;
  expiryDate: any = false;
  uploadDir = 'student';
  showAddButton = true;
  excel_permisson: number = 0;
  showDecisionBtns = true;
  private onDestroy$: Subject<void> = new Subject<void>();
  @Input()
  canReceive:boolean=false;

  constructor(private studentDocumentService: StudentDocumentService,
    private matDialog: MatDialog,
    authService: AuthenticationService,
    private miscService: MiscService,
    private insitutiondocument: InstitutionDocumentService,
    private toasterService: ToasterService,
    private utcToLocaltimePipe: UtcToLocaltimePipe,
    private mSMAgentService: MSMAgentService,
    private commonService: CommonService,
    private activityLog: ActivityLogService
  ) {
    this.user = authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.expiryDate = this.showReceived;
    this.columns = [
      { dataField: 'DocumentName', title: 'Attachment', type: '', format: '', visible: 'true' },
      { dataField: 'DocumentStatusName', title: 'Status', type: '', format: '', visible: 'true' },
      { dataField: 'ReviewRemark', title: 'Remark', type: '', format: '', visible: this.showRemark },
      { dataField: 'AddStamp', title: 'Date Uploaded', type: 'date', format: 'dd MMM yyyy', visible: 'true' },
      { dataField: 'DocDescription', title: 'Description', type: 'date', format: 'dd MMM yyyy' , visible: (this.docDescription ==true  ? true : false) },
      { dataField: 'ExpiryDate', title: 'Expire Date', type: 'date', format: 'dd MMM yyyy', visible: this.expiryDate },
      { dataField: 'UploadBy', title: 'Upload By', type: 'date', format: 'dd MMM yyyy', visible: true},
      { dataField: 'ReceiveStamp', title: 'Received Stamp', type: 'date', format: 'dd MMM yyyy', visible: this.showReceived },
    ];

    if (+this.parentType === 4) {
      this.insitutiondocument.listForApplication(this.instituteId, this.countryId)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.documentList = res;
          this.list();
          this.showList = [];
          this.documentList.forEach(val => this.showList.push(Object.assign({}, val)));
          if (!this.requiredDocumentList) {
            this.requiredDocumentList = this.documentList.filter(d => d.required);
          }
        });
    } else {
      this.miscService.document(this.parentType)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.documentList = res;
          this.list();
          this.showList = [];
          this.documentList.forEach(val => this.showList.push(Object.assign({}, val)));
          if (!this.requiredDocumentList) {
            this.requiredDocumentList = this.documentList.filter(d => d.required);
          }
        });
    }



    if (+this.parentType === 9) {
      // this.documentList = AppDefaultValue.agentDocuments;
      if (this.documentList) {
        this.requiredDocumentList = this.documentList.filter(d => d.required);
      }
      this.uploadDir = 'agent';
      this.showVerification = true;
    }
    if (+this.parentType === 7) {
      this.showVerification = true;
    }

    if(+this.parentType === 16) {
      this.showVerification = true;
      this.showDecisionBtns = false;
    }

  }


  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (this.documentInfo != '') { this.list(); }
    if (changes['requiredDocumentList'] && changes['requiredDocumentList'].previousValue != changes['requiredDocumentList'].currentValue) {
      this.getDisplayDocList();
    }
  }

  list() {
    this.gridMessage = 'Loading';
    this.studentDocumentService.list(this.parentId, this.parentType)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList = res;
        this.gridMessage = 'No data';
        this.getDisplayDocList();
      });
    if (this.user.RoleId === 2 && +this.parentType === 9) {
      this.mSMAgentService.businessCertStatus().pipe(takeUntil(this.onDestroy$)).subscribe(status => {
        this.commonService.BusinessProfileStatus.next(status);

        // this.businessCertificateStatus = status;
      });
    }

  }


  updateDocument(DocumentTypeId?: number, documentId?: number , docDescription?: string) {
        if (!DocumentTypeId) {
      this.documentListCopy = this.showList
    } else {
      this.documentListCopy = this.documentList
    }
    if(typeof this.originDetails =='object'  &&  this.originDetails.type == 'studentDoc'){
      this.originDetails.parentID =this.originDetails.id ; this.originDetails.parentType= 6 ; this.originDetails.type='studentDoc';
    }
    this.matDialog.open(UploadDocumentsComponent, { data: { uploaddir: this.uploadDir, documentList: this.documentListCopy, DocumentTypeId: DocumentTypeId , expiryDateStatus : this.expiryDate , originDetails: this.originDetails , docDescription: docDescription   } }).afterClosed()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.studentDocumentService.add({
          ParentId: this.parentId,
          ParentType: this.parentType,
          DocPath: res.DocPath,
          DocumentId: documentId,
          DocumentTypeId: res.DocumentTypeId,
          ExpiryDate:res.expiryDate,
          DocumentName: res.description
        }).pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
          if (documentId) {
            this.toasterService.pop('success', 'Document updated successfully');
          } else {
            this.toasterService.pop('success', 'Document saved successfully');
          }
          this.list();
          const documentStatus = { documentTypeId: res.DocumentTypeId, message: 'saved' }
          this.onDocumentUpload.emit(documentStatus);
          this.onDocumentChange.emit(true);
        });
      }
    });
  }

  delete(documentId: number, DocumentTypeId: number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res) {
          this.studentDocumentService.delete(documentId)
            .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              this.toasterService.pop('success', 'Document deleted successfully');
              this.list();
              const documentStatus = { documentTypeId: DocumentTypeId, message: 'deleted' }
              this.onDocumentUpload.emit(documentStatus);
              this.onDocumentChange.emit(true);
            });
        }
      });
  }


  getDocumentStatusName(doc?: any) {
    if (!doc || !doc.DocPath) {
      return 'Pending';
    } else if (doc.DocumentId > 0 && !doc.DocumentStatus) {
      return 'Uploaded';
    } else if (doc.DocumentStatus === 2) {
      return 'Approved';
    } else if (doc.DocumentStatus === 3) {
      return 'Rejected';
    } else {
      return 'Undefined ' + doc.DocumentStatus;
    }
  }


  getDisplayDocList() {

    this.displayDocList = [];

    if (this.requiredDocumentList) {
      const pendingDoc: string[] = [];
      this.displayDocList = this.requiredDocumentList.map(d => {
        let uploadDoc = this.getUploadStatus(d.DocumentTypeId);

        if (!uploadDoc) {
          pendingDoc.push(d.DocumentName);
        }


        return {
          DocumentId: uploadDoc ? uploadDoc.DocumentId : 0, DocumentName: d.DocumentName, required: true, DocumentStatus: uploadDoc ? uploadDoc.DocumentStatus : 0, DocPath: uploadDoc ? uploadDoc.DocPath : '',
          ReviewRemark: uploadDoc ? uploadDoc.ReviewRemark : '', AddStamp: uploadDoc ? uploadDoc.AddStamp : '', UploadBy : uploadDoc ? uploadDoc.UploadBy : '',
          DocumentTypeId: d.DocumentTypeId, DocumentStatusName: this.getDocumentStatusName(uploadDoc), DocDescription : uploadDoc ? uploadDoc.DocDescription : ''
        }
      });

      this.onPendingDocumentUpdate.emit(pendingDoc);

    }


    if (this.dataList && !(this.instaDoc)) {
      this.dataList.forEach(element => {
        if (this.displayDocList.findIndex(d => d.DocumentTypeId === element.DocumentTypeId) >= 0) {
          return;
        }

        this.displayDocList.push({
          DocumentId: element.DocumentId, DocumentName: element.DocumentName, required: false, DocumentStatus: element.DocumentStatus, DocPath: element.DocPath,
          ReviewRemark: element.ReviewRemark, AddStamp: this.utcToLocaltimePipe.transform(element.AddStamp, 'DD MMM YYYY'),
          ExpiryDate: this.utcToLocaltimePipe.transform(element.ExpiryDate, 'DD MMM YYYY'), ReceiveStamp: this.utcToLocaltimePipe.transform(element.ReceiveStamp, 'DD MMM YYYY'),
          DocumentTypeId: element.DocumentTypeId, DocDescription :element.DocDescription,UploadBy : element.UploadBy,
          DocumentStatusName: this.getDocumentStatusName(element)
        });
       // console.log(this.displayDocList)
      });



      let displayDocListIds;

      if (this.displayDocList.length) {
        displayDocListIds = this.displayDocList.map((items) => {
          return items.DocumentTypeId
        })

        if (this.addButtonRestrict && displayDocListIds.length === 1) {
          this.showAddButton = false
        } else {
          this.showAddButton = true
        }

        if (this.documentList && !(this.instaDoc)) {
          const displayDocListIdsLength = displayDocListIds.length;
          const expectedCopyLength = this.documentList.length - displayDocListIdsLength

          if (this.showList.length > expectedCopyLength) {
            if (displayDocListIds && this.showList.length) {
              this.showList = this.removeFromArray(this.showList, displayDocListIds);
            }
          } else {
            const missing = this.removeFromArray(this.documentList, displayDocListIds);
            this.showList = [];
            this.showList = missing
          }
        }
      } else {
        this.showList = this.documentList
        this.showAddButton = true
      }
    } else {
      this.showAddButton = true
      this.displayDocList=this.dataList;
    }
  }


  removeFromArray(original, remove) {
    return original.filter(value => !remove.includes(value.DocumentTypeId));
  }
  getUploadStatus(docTypeId: number) {
    if (this.dataList) {
      return this.dataList.filter(d => d.DocumentTypeId === docTypeId)[0];
    }
    return null;
  }

  verifyDocument(doc: any, status: number) {
    if (status === 2) {
      this.matDialog.open(ConfirmBoxComponent, { data: { content: ' Are you sure want to approve this document?' } }).afterClosed()
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.studentDocumentService.statusUpdate(
              {
                DocumentId: doc.DocumentId,
                ParentId: this.parentId,
                ParentType: this.parentType,
                StatusId: status,
                Remark: ''
              }
            )
              .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
                this.list();
                this.toasterService.pop('success', 'Document approved successfully');
              });
          }
        });
    } else if (status == 3) {
      this.matDialog.open(InputBoxDialogComponent, { data: { title: 'Rejection Remark', valueName: 'Remark', required: true }, width: '80%' }).afterClosed()
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res !== false) {
            this.studentDocumentService.statusUpdate(
              {
                DocumentId: doc.DocumentId,
                ParentId: this.parentId,
                ParentType: this.parentType,
                StatusId: status,
                Remark: res
              }
            )
              .pipe(takeUntil(this.onDestroy$)).subscribe(res1 => {
                this.list();
                this.toasterService.pop('success', 'Document rejected successfully');
              });
          }
        });
    }
  }

  downloadDocument() {
    this.studentDocumentService.downloadDocument(this.parentId, this.parentType)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {

        let url = window.URL.createObjectURL(res);
        window.open(url);
      });
  }

  downloadFile(documentId: number) {
    this.studentDocumentService.downloadFile(documentId, this.parentId, this.uploadDir)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        window.open(this.filepath + 'download/' + res);
      });
  }

  receivedDateStamp(doc, status) {
    this.studentDocumentService.receiveStatusUpdate(
      {
        DocumentId: doc.DocumentId,
        ParentId: this.parentId,
        ParentType: this.parentType,
        StatusId: status,
        Remark: ''
      }
    )
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.receivedStatus = status == 0 ? false : true;
        this.columns.forEach(item => {
          if (item.dataField == "ReceiveStamp") {
            item.visible = this.receivedStatus;
          }
        })
        this.list();
        this.toasterService.pop('success', status === 1 ? 'Document received successfully' : 'Document undo successfully');
      });
  }

  activitylog(){
    this.activityLog.activitylog(this.parentId, this.parentName, this.title+' Export').pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
