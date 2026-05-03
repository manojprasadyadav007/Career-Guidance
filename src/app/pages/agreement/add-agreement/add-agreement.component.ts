import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AgreementService } from 'app/services/agreement.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {   editorlist} from 'app/models/site-map.model';
import { UploadService } from 'app/services/upload.service';
import { UserService } from 'app/services/user.service';
import { InstituteService } from 'app/services/institute.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
@Component({
  selector: 'app-add-agreement',
  templateUrl: './add-agreement.component.html',
  styleUrls: ['./add-agreement.component.scss']
})
export class AddAgreementComponent implements OnInit , OnDestroy {

  file:File;

  formdata: any;
  btnLabel: String = 'Add';
  instFilter:any ='';
  signFilter:any='';
  permission: number = 0;

  signingAuthorityList:any[];
  flagdisabled:boolean = false;
  parentType:number=0;
  parentId:number=0;
  popupVisible: boolean;
  instiutionList:any[];
  items: any = Object.assign([], editorlist);
  formerror:string;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private agreementService: AgreementService,
    private dialogRef: MatDialogRef<AddAgreementComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private uploadService:UploadService,
    private userService:UserService,
    private institutionService:InstituteService,
    private toasterService: ToasterService
  ) {
    this.items.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
  })
     this.parentType= data.ParentType;
     this.parentId = data.ParentId;

    this.formdata = {
      AgreementId: data.AgreementId | 0,
      ParentId: data.ParentId,
      ParentType: data.ParentType,
      AgreementDescription: '',
      AgreementPath:'',
      StartDate:null,
      EndDate:null,
      IsNew:false,
      SigningAuthority:null,
      InstitutionId:null
    }
    this.permission = data.permission | 0;

   
  }

  ngOnInit() {
    this.fillInstitution();

    this.fillSigningAuthority();

    this.get();
   
  }

  save(form?:NgForm) {

    this.formerror = null;

    if(form)
    {
      if(form.invalid)
      {
        return;
      }

      if(this.formdata.AgreementId===0)
      {
        if(!this.formdata.IsNew)
        {
            if(!this.file && !this.formdata.AgreementPath)
            {
              this.formerror='Attachment Required';
              return;
            }
        }
      }
    }

    if(this.file)
    { 
        this.uploadFile();
        return;
    }


    this.flagdisabled = true;
    if (this.formdata.AgreementId != 0) {
      this.agreementService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "Agreement updated successfully");
        this.dialogRef.close(true);
      },err =>{
        this.flagdisabled = false;
      });
    }
    else {
      this.agreementService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "Agreement saved successfully");
        this.dialogRef.close(true);
      },err =>{
        this.flagdisabled = false;
      });
    }
  }

  uploadFile()
  {
      this.uploadService.uploadFileWithoutProgress('Agreement',this.file).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.formdata.AgreementPath=res[0];
          this.file=undefined;
          this.save();
      });
  }

  get() {
    if (this.formdata.AgreementId > 0) {
      this.agreementService.get(this.formdata.AgreementId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.formdata = res;
          this.btnLabel = 'Update';
          this.fillInstitution();
          this.fillSigningAuthority();
      })
    }
  }

  fillInstitution()
  {
    if(+this.parentType===9)
    {
        this.institutionService.forDDLByAgentAndCountry(this.parentId,0).pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.instiutionList = res;
        });
    }
  }

  fillSigningAuthority(reset?:boolean)
  {
    this.signingAuthorityList = [];

    if(reset)
    {
      this.formdata.SigningAuthority=null;
    }

    if(+this.parentType===9 && (this.formdata.IsNew || this.formdata.RequestId) )
    {
      if(this.formdata.InstitutionId && this.formdata.InstitutionId>0)
      {
        this.userService.forDDLByRoleType('','',this.formdata.InstitutionId,0,'2','').pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.signingAuthorityList = res;
        });
      }
      else{
        this.userService.forDDLByRoleType('','',0,0,'1','').pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
          this.signingAuthorityList = res;
        });
      }
    }
   
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
