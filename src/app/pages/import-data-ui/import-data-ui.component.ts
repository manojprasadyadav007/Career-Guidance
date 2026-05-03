import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { UploadService } from 'app/services/upload.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { ImportService } from 'app/services/import.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-import-data-ui',
  templateUrl: './import-data-ui.component.html',
  styleUrls: ['./import-data-ui.component.scss']
})
export class ImportDataUiComponent implements OnInit {

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private authService: AuthenticationService,
    private uploadService: UploadService,
    private importService:ImportService,
    private activateRoute:ActivatedRoute,
    private toastService:ToasterService
  ) { }

  docFile: File;
  columnFilter:any ='';
  columnList: any[];
  excelColumnList:any[];
  fileName: string;
  progress: number;
  template:string;

  ngOnInit() {
      this.activateRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param=>{
        this.template = param.get("template");
        this.getTemplate();
      })
  }

  doUpload() {
    this.uploadService.uploadFile("import", this.docFile).pipe(takeUntil(this.onDestroy$)).subscribe((res: HttpEvent<any>) => {
      if (res.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * res.loaded) / res.total);
      }
      else if (res.type === HttpEventType.Response) {
        this.fileName = res.body[0];
        this.getColumns();
      }
    });
  }

  doImport() {
      this.importService.import(this.template,this.fileName,this.columnList).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
         if(res.error.length===0)
         {
           this.toastService.pop('success','Import','Import successfully');
           this.excelColumnList=null;
           this.fileName='';
           this.docFile=null;
         }
         else
         {
          this.toastService.pop('error','Import','Import successfully');
         }
      })
  }


  getTemplate()
  {
      this.importService.template(this.template).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.columnList = res;
      });
  }

  getColumns()
  {
      this.importService.columns(this.fileName).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
        this.excelColumnList = res;
      });
  }

  reset()
  {
     this.excelColumnList=null;
     this.fileName='';
     this.docFile=null;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
