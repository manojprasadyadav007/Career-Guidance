import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'app/models/login.model';
import { appPattern } from 'app/models/site-map.model';
//import { AddInstitutionDocumentComponent } from 'app/pages/institutions/institution-document/add-institution-document/add-institution-document.component';
import { AgentDocumentService } from 'app/services/agent-document.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { InstCountryService } from 'app/services/inst-country.service';
//import { InstitutionDocumentService } from 'app/services/institution-document.service';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit,OnDestroy {


  formdata: any;
  btnLable: string = "Add";
  currentUser: Login;
  instituionId: number = 0;
  provinceFilterForPrimCont: any;
  provinceList: any[];
  DocumentTypeId: number;
  docFilter: any = '';
  flagdisabled: boolean = false;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  documentList: any[];
  regionFilter: any = '';
  regionList: any[];
  modelPattern = appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private authService: AuthenticationService,
    private miscService: MiscService,
    private agentdocument: AgentDocumentService,
    private instCountry: InstCountryService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<AddDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.formdata = {
      DocumentCountryId: data.DocumentCountyId,
      CountryId: 0,
      ProvinceId: null,
      DocumentTypeId: null,
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

    this.miscService.document(9).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.documentList = res;
    });
    if (this.formdata.DocumentCountryId > 0) {
      this.get();
    }
  }
  fillRegion() {
    this.miscService.countryWithGroup(0).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.regionList = res;
    })
  }
  fillProvince(countryId,reset?:boolean) {
    if(reset){ this.formdata.ProvinceId=null }
    if (!countryId) { return; }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceList = res;
      });
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.flagdisabled = true;

    if (this.formdata.DocumentCountryId > 0) {
      this.agentdocument.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (+res > 0) {
          this.toasterService.pop('success', 'Document updated successfully');
          this.isAdd = true;
          this.close();
        } else {
          this.toasterService.pop('error', res);
        }
        this.flagdisabled = false;

      }, err => {
        this.flagdisabled = false;
      });

    }
    else {

      this.agentdocument.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

        if (+res > 0) {
          this.toasterService.pop('success', 'Document saved successfully');
          this.isAdd = true;
          if (this.closeAfterAdd) {
            this.close();
          }
          else {
            form.reset();
            this.resetForm();
          }
        } else {
          this.toasterService.pop('error', res);
        }
        this.flagdisabled = false;
      }, err => {
        this.flagdisabled = false;
      });
    }
  }
  get() {
    this.agentdocument.get(this.formdata.DocumentCountryId).pipe(takeUntil(this.onDestroy$)).subscribe(async res => {
      this.formdata.CountryId = res.CountryId;
      this.formdata.ProvinceId = res.ProvinceId;
      this.formdata.DocumentTypeId = parseInt(res.DocumentTypeId);
      this.fillProvince(res.CountryId);
      this.btnLable = "Update";
    });
  }

  resetForm() {

    this.formdata = {
      DocumentTypeId: null,
      CountryId: -1,
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
