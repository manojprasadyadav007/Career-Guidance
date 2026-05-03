import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { InstCampusService } from 'app/services/inst-campus.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { appPattern } from 'app/models/site-map.model';
import { Country } from 'app/models/country-model';
import { MiscService } from 'app/services/misc.service';


@Component({
  selector: 'app-add-campus',
  templateUrl: './add-campus.component.html',
  styleUrls: ['./add-campus.component.scss']
})
export class AddCampusComponent implements OnInit, OnDestroy {

  btnLabel: String = 'Add';
  modelPattern = appPattern;
  formdata: any = { City: '', CampusName: '', Region: '', GoogleMapLink: '' , CountryId: ''};
  flagdisabled: boolean = false;

  provinceList: any;
  countryList: Country[];
  provinceFilter: any = '';
  countryFilter: any = '';
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private miscService: MiscService,
    private instCampusService: InstCampusService,
    private dialogRef: MatDialogRef<AddCampusComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.formdata =
    {
      InstitutionId: data.institutionId,
      CampusName: data.CampusName,
      InstCampusId: data.InstCampusId,
    }
    this.getData();
  }

  ngOnInit() {
    this.fillCountry();
  }
  getData() {
    if (this.formdata.InstCampusId != 0) {
      this.instCampusService.get(this.formdata.InstCampusId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
        this.btnLabel = 'Update';
        this.fillProvince(this.formdata.CountryId);
      });
    }
  }

  fillProvince(countryId,reset?:boolean) {
    if(reset){this.formdata.Region=null}
    this.provinceList = [];
    if (!countryId) { return;  }
    this.miscService.province(countryId)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.provinceList = res;
      });
  }

  fillCountry() {
    //this.provinceList = [];
    this.countryList = [];
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
      });
  }


  onSubmit(form: NgForm) {

    this.flagdisabled = true;
    if (this.formdata.InstCampusId > 0) {
      this.instCampusService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dialogRef.close(true);
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {
      this.instCampusService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dialogRef.close(true);
      },err=>{
        this.flagdisabled =false;
      });
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
