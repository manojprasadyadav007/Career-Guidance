import { Component, Inject, OnInit , OnDestroy} from '@angular/core';
import { Login } from 'app/models/login.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs/internal/Subject';
import { appPattern } from 'app/models/site-map.model';
import { NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { InstitutionDocumentService } from 'app/services/institution-document.service';
import { MiscService } from 'app/services/misc.service';

@Component({
  selector: 'app-add-institution-document',
  templateUrl: './add-institution-document.component.html',
  styleUrls: ['./add-institution-document.component.scss']
})
export class AddInstitutionDocumentComponent implements OnInit,  OnDestroy {

  formdata: any;
  btnLable: string = "Add";
  currentUser: Login;
  instituionId: number = 0;
  DocumentTypeId: number;
  docFilter:any='';
  flagdisabled:boolean =false;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  documentList:any[];
  regionFilter:any='';
  regionList: any[];
  messageTitle: string = 'Document';
  modelPattern=appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private authService: AuthenticationService,
    private miscService:MiscService,
    private institutiondocument: InstitutionDocumentService,
    private instCountry: InstCountryService,
    private toasterService:ToasterService,
    private dialogRef: MatDialogRef<AddInstitutionDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) { 
    this.instituionId = data.InstitutionId;
    this.formdata = {
      InstituteDocumentId: data.InstituteDocumentId,
      InstituteId: this.instituionId,
      RegionId: 0,
      DocumentId: null,
      TAT:''
    };

    if (data.closeAfterAdd === undefined) {
      this.closeAfterAdd = true;
    }
    else {
      this.closeAfterAdd = data.closeAfterAdd;
    }
  

  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.fillRegion();

    this.miscService.document(4).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.documentList=res;
    });

    if (this.formdata.InstituteDocumentId > 0) {
      this.get();
    }
    

    
  }

  fillRegion() {
    this.instCountry.list(this.instituionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.regionList = res;
    })
  }
  
  onSubmit(form:NgForm) {

    if (form.invalid) {
      return;
    }
    this.flagdisabled =true;

    if (this.formdata.InstituteDocumentId > 0) {
      this.institutiondocument.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if(+res > 0){
          this.toasterService.pop('success','Document updated successfully');
          this.isAdd = true;
          this.close();
        }else{
          this.toasterService.pop('error',res);
        }
        this.flagdisabled = false;
        
      }, err =>{
        this.flagdisabled = false;
      });
    }
    else {

      this.institutiondocument.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if(+res > 0){
          this.toasterService.pop('success','Document saved successfully');
          this.isAdd = true;
          if (this.closeAfterAdd) {
            this.close();
          }
          else {
            form.reset();
            this.resetForm();
          }
        }else{
          this.toasterService.pop('error',res);
        }
         this.flagdisabled =false;
        }, err =>{
        this.flagdisabled =false;
      });
    }
    
  }
  get() {
    this.institutiondocument.get(this.formdata.InstituteDocumentId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formdata.RegionId = res.RegionId;
      this.formdata.DocumentId = parseInt(res.DocumentId);
      this.btnLable = "Update";
    });
  }

  resetForm() {

    this.formdata = {
      InstituteDocumentId: 0,
      InstituteId: this.instituionId,
      DocumentId:null,
      RegionId: -1,
      TAT:null,
    };
  }

  close() {
    this.dialogRef.close(this.isAdd);
  }

  

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
