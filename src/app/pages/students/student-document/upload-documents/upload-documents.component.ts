import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'app/services/upload.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { appPattern } from 'app/models/site-map.model';
import { StudentDocumentService } from 'app/services/student-document.service';
import { MyDocumentViewComponent } from '../my-document-view/my-document-view.component';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit , OnDestroy {

  progress: number = 0;
  dirPath: string = '';
  DocumentFile: File;
  formdata: any;
  flagdisable:boolean=false;
  documentList: any[];
  modelPattern = appPattern;
  doumntFilter:any='';
  docTypeId:number=0;
  isDisabled:boolean=false;
  sizeerror:string;
  pastDate: Date = new Date();
  expiryDateStatus:any =false;
  originDetails:any;
  description:any = null;
  displayDocList:any = [];
  columns:any = [];
  showFilterRow = false;
  studentDoc:any;
  dataList:any;
  mydocpath:any;
  gridMessage:any = '';
  filepath: string = environment.filepath;
  uploadDir = 'student';
  myDocError= false;
  DocumentName:any;
  defaultSizeLimit= environment.fileSizeLimit;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private dialogref: MatDialogRef<UploadDocumentsComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private uploadService: UploadService,
    private matDialog: MatDialog,
    private studentDocumentService: StudentDocumentService,
    //private miscService: MiscService
  ) {
    this.dirPath = data.uploaddir;
    this.documentList = data.documentList;
    this.expiryDateStatus = data.expiryDateStatus;
    this.originDetails = data.originDetails;
    if(typeof this.originDetails == 'object'){
      this.studentDoc = this.originDetails.type;
    }
    if(data.DocumentTypeId)
    {
      this.description = data.docDescription
       this.docTypeId=data.DocumentTypeId;
       this.isDisabled = true;
    }
    
  }
  

  ngOnInit() {
    this.formdata = { DocPath: '', DocumentTypeId: this.docTypeId ,docDescription: this.description };
    this.columns = [
      { dataField: 'DocumentName', title: 'Attachment', type: '', format: '', visible: 'true' },
      // { dataField: 'DocumentStatusName', title: 'Status', type: '', format: '', visible: 'true' },
      // { dataField: 'ReviewRemark', title: 'Remark', type: '', format: '', visible: 'true' },
      // { dataField: 'AddStamp', title: 'Date Uploaded', type: 'date', format: 'dd MMM yyyy', visible: 'true' },
      // { dataField: 'DocDescription', title: 'Description', type: 'date', format: 'dd MMM yyyy' , visible:'true' },
      // { dataField: 'ExpiryDate', title: 'Expire Date', type: 'date', format: 'dd MMM yyyy', visible:'true' },
      // { dataField: 'ReceiveStamp', title: 'Received Stamp', type: 'date', format: 'dd MMM yyyy', visible: 'true' },
    ];
   

  }

  upload(invalid :NgForm) {
 
    if(!invalid && this.studentDoc =='studentDoc'){
      if(!(this.mydocpath ||this.DocumentFile )){
      this.myDocError =true;
      return;
    }
    if(this.mydocpath){
      this.dialogref.close({ DocPath:this.mydocpath , DocumentTypeId: this.formdata.DocumentTypeId, newfile: true });
      return;
    }

    }
    this.flagdisable =true;
    this.uploadService.uploadFile(this.dirPath, this.DocumentFile).pipe(takeUntil(this.onDestroy$)).subscribe((res: HttpEvent<any>) => {

      if (res.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * res.loaded) / res.total);
      }
      else if (res.type === HttpEventType.Response) {
              this.flagdisable =false;
              if(this.expiryDateStatus){
                this.dialogref.close({ DocPath: res.body[0], DocumentTypeId: this.formdata.DocumentTypeId, newfile: true , expiryDate :this.formdata.ExpiryDate });
              }else if(this.originDetails == "agentDoc"){
                this.dialogref.close({ DocPath: res.body[0], DocumentTypeId: this.formdata.DocumentTypeId, newfile: true , description: this.formdata.docDescription });
              }
              
              // else if(this.studentDoc =='studentDoc'){
              //   this.dialogref.close({ DocPath:this.mydocpath , DocumentTypeId: this.formdata.DocumentTypeId, newfile: true });
              // }
              else{
                this.dialogref.close({ DocPath: res.body[0], DocumentTypeId: this.formdata.DocumentTypeId, newfile: true });
              }
         

      }
    }
    );
  }
  cancel() {
    this.dialogref.close();
  }

  fileChange(fileInput: any) {
  this.flagdisable =false;
  this.myDocError =false;
    this.sizeerror=undefined;
    this.mydocpath = undefined;
    if(fileInput.target.files[0])
    {
      this.DocumentFile = <File>fileInput.target.files[0];
      if((this.DocumentFile.size/(1024))> this.defaultSizeLimit )
      {
        this.sizeerror=`Size limit exceed, max ${this.defaultSizeLimit} kb allowed`;
        this.DocumentFile=undefined;
      }
    }
  }
 myDoc(){
   if(this.formdata.DocumentTypeId){
   let name = this.documentList.filter(item => {return item.DocumentTypeId ==this.formdata.DocumentTypeId
     //return item.DocumentName;
   }).reduce(item =>  item.DocumentName);
   this.DocumentName =name.DocumentName;
    }
    this.matDialog.open(MyDocumentViewComponent, { data: { data: this.originDetails , name: this.DocumentName}}).afterClosed()
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if(res){
      this.mydocpath  =  res.data
      this.myDocError =false;
      }
 });
  }

  rowData(evt){

  }

  documentChange(){
    this.mydocpath = undefined;
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
