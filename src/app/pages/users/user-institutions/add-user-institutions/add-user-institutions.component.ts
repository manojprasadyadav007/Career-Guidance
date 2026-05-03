import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MiscService } from 'app/services/misc.service';
import { UserInstitutionService } from 'app/services/user-institution.service';
import { InstCountryService } from 'app/services/inst-country.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-add-user-institutions',
  templateUrl: './add-user-institutions.component.html',
  styleUrls: ['./add-user-institutions.component.scss']
})
export class AddUserInstitutionsComponent implements OnInit , OnDestroy{

  formdata: any = {
    AssignId: 0,
    UserId:0,
    InstitutionId: null,
    RegionId: null,
    Zone: null,
  }
  instFilter:any='';
  regionFilter:any='';
  zoneFilter:any='';
  institutionList: any[];
  regionList: any[];
  ZoneList: any[];

  btnLabel: string = 'Add';

  roleType:number=0;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private miscService: MiscService,
    private userInstService: UserInstitutionService,
    private instCountryService: InstCountryService,
    private dialogRef: MatDialogRef<AddUserInstitutionsComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {

    if (data.AssignId > 0) {
      this.formdata.AssignId = data.AssignId;
    }
    this.formdata.UserId=data.UserId;

    this.roleType = data.roleType;

    if(this.roleType===2)
    {
      this.formdata.RegionId=0;
      this.formdata.ZoneId=0;
    }

  }

  ngOnInit() {
    if (this.formdata.AssignId > 0) {
      this.get();
    }

    this.miscService.institutionForFilter(
      {
        InstType: [],
        Country: [],
        Province: []
      }
    ).subscribe(res => {
      this.institutionList = res;
    });
  }

  add() {

    if (this.formdata.AssignId > 0) {
      this.userInstService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
    else {
      this.userInstService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
  }

  listRegion() {
    this.regionList = [];
    if (this.formdata.InstitutionId > 0) {
      this.instCountryService.list(this.formdata.InstitutionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.regionList = res;
      });
    }
  }

  listZone() {
    this.ZoneList = [];

    if (this.formdata.RegionId > 0) {
      this.miscService.zone(this.formdata.RegionId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.ZoneList = res;
      });
    }
  }

  get() {
    this.userInstService.get(this.formdata.AssignId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formdata.InstitutionId = res.InstitutionId;
      this.listRegion();
      this.formdata.RegionId = res.RegionId;
      this.listZone();
      this.formdata.ZoneId = res.ZoneId;
      this.btnLabel = 'Update';
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
