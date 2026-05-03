import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentDocumentService } from 'app/services/student-document.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-my-document-view',
  templateUrl: './my-document-view.component.html',
  styleUrls: ['./my-document-view.component.scss']
})
export class MyDocumentViewComponent implements OnInit {
  columns:any =[];
  datalist:any;
  displayDocList:any ;
  gridMessage:any;
  uploadDir = 'student';
  documenttype:any;
 
  filepath: string = environment.filepath;
  showFilterRow:boolean=false;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private dialogref: MatDialogRef<MyDocumentViewComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private studentDocumentService: StudentDocumentService) {
      this.documenttype = data.name;
      this.datalist = data.data;
    }

  ngOnInit() {
    this.columns = [
      { dataField: 'DocumentName', title: 'Attachment', type: '', format: '', visible: 'true' },
      // { dataField: 'DocumentStatusName', title: 'Status', type: '', format: '', visible: 'true' },
      // { dataField: 'ReviewRemark', title: 'Remark', type: '', format: '', visible: 'true' },
      // { dataField: 'AddStamp', title: 'Date Uploaded', type: 'date', format: 'dd MMM yyyy', visible: 'true' },
      // { dataField: 'DocDescription', title: 'Description', type: 'date', format: 'dd MMM yyyy' , visible:'true' },
      // { dataField: 'ExpiryDate', title: 'Expire Date', type: 'date', format: 'dd MMM yyyy', visible:'true' },
      // { dataField: 'ReceiveStamp', title: 'Received Stamp', type: 'date', format: 'dd MMM yyyy', visible: 'true' },
    ];
   

  if(this.datalist){
      this.studentDocumentService.list(this.datalist.parentID, this.datalist.parentType)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if(this.documenttype){
          this.displayDocList  = res.filter(list => list.DocumentName == this.documenttype);
          }else{
            this.displayDocList = res;
          }
       
        this.gridMessage = 'No data';
       // this.getDisplayDocList();
      });
    }

  }

  cancel() {
    this.dialogref.close();
  }
  rowData(evt){
   this.dialogref.close({ data:evt.data.DocPath });
  }

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

}
