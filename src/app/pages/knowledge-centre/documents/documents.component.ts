import { Component, OnInit, Input, SimpleChange, Output, EventEmitter, OnDestroy } from '@angular/core';
import { StudentDocumentService } from 'app/services/student-document.service';
import { MatDialog } from '@angular/material';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { InputBoxDialogComponent } from 'app/utility/input-box-dialog/input-box-dialog.component';
import { environment } from 'environments/environment';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from "angular2-toaster";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit  , OnDestroy {

  @Input()
  parentId:number;

  @Input()
  parentType:number;

  @Input()
  permission:number;

  showVerification:boolean=false;

  dataList:any[];

  displayDocList:any[];
  private onDestroy$: Subject<void> = new Subject<void>();
  documentList: any[];

  @Input()
  requiredDocumentList: any[];

  filepath: string = environment.filepath;

  user:Login;

  @Output()
  onDocumentChange:EventEmitter<any>= new EventEmitter();

  uploadDir:string='knowledge-centre';
   


  constructor(private studentDocumentService:StudentDocumentService,
    private matDialog:MatDialog,
    authService:AuthenticationService,
    private miscService:MiscService,
    private toasterService:ToasterService
    ) {
        this.user = authService.currentUserSubject.getValue();
     }

  ngOnInit() {

    this.miscService.document(this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.documentList =res;
      if(!this.requiredDocumentList)
      {
        this.requiredDocumentList=this.documentList.filter(d=>d.required);
      }
    });
    
    if(+this.parentType===9)
    {
       //this.documentList = AppDefaultValue.agentDocuments;
       if(this.documentList)
       {
        this.requiredDocumentList=this.documentList.filter(d=>d.required);
       }
       this.uploadDir = 'agent';
       this.showVerification=true;
    }
    if(+this.parentType===7)
    {
      this.showVerification=true;
    }
    this.list();
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    
    if (changes['requiredDocumentList'] && changes['requiredDocumentList'].previousValue != changes['requiredDocumentList'].currentValue) {
     this.getDisplayDocList();
    }
  }

  list()
  {
     this.studentDocumentService.list(this.parentId,this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.dataList=res;
        this.getDisplayDocList();
     });
  }



  
  updateDocument(DocumentTypeId?: number,documentId?:number) {
    this.matDialog.open(UploadFilesComponent, { data: { uploaddir: this.uploadDir, documentList: this.documentList,DocumentTypeId:DocumentTypeId } }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
             this.studentDocumentService.add({
              ParentId:this.parentId,
              ParentType:this.parentType,
              DocPath:res.DocPath,
              DocumentId:documentId,
              DocumentTypeId:res.DocumentTypeId,
             }).pipe(takeUntil(this.onDestroy$)).subscribe(res1=>{
              this.toasterService.pop("success", "Saved successfully");
              this.list();
               this.onDocumentChange.emit(true);
             });
      }
    });
  }

  delete(documentId:number) {
    this.matDialog.open(ConfirmBoxComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.studentDocumentService.delete(documentId).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.toasterService.pop("success", "Deleted successfully");
            this.list();
            this.onDocumentChange.emit(true);
        });
      }
    });
  }


  
  getDisplayDocList() {

    this.displayDocList = [];

    if(this.requiredDocumentList)
    {
      this.displayDocList = this.requiredDocumentList.map(d => {
        var uploadDoc = this.getUploadStatus(d.DocumentTypeId);
        return {
          DocumentId: uploadDoc ? uploadDoc.DocumentId : 0, DocumentName: d.DocumentName, required: true, DocumentStatus: uploadDoc ? uploadDoc.DocumentStatus : 0, DocPath: uploadDoc ? uploadDoc.DocPath : '',
          ReviewRemark: uploadDoc ? uploadDoc.ReviewRemark : '', AddStamp: uploadDoc ? uploadDoc.AddStamp : '',
          DocumentTypeId:d.DocumentTypeId
        }
      });
    }
   

    if (this.dataList) {
      this.dataList.forEach(element => {
        if (this.displayDocList.findIndex(d => d.DocumentTypeId === element.DocumentTypeId) >= 0) {
          return;
        }

        this.displayDocList.push({
          DocumentId: element.DocumentId, DocumentName: element.DocumentName, required: false, DocumentStatus: element.DocumentStatus, DocPath: element.DocPath,
          ReviewRemark: element.ReviewRemark, AddStamp: element.AddStamp,
          DocumentTypeId:element.DocumentTypeId
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
              ParentType:this.parentType,
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
              ParentType:this.parentType,
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

  downloadDocument()
  {
      this.studentDocumentService.downloadDocument(this.parentId,this.parentType).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
       
        var url = window.URL.createObjectURL(res);
        window.open(url);
      });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
