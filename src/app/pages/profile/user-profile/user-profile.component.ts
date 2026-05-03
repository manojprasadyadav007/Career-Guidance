import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'app/models/user-model';
import { appPattern } from 'app/models/site-map.model';
import { Login } from 'app/models/login.model';
import { environment } from 'environments/environment';
import { UserService } from 'app/services/user.service';
import { RoleService } from 'app/services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { UploadService } from 'app/services/upload.service';
import { MiscService } from 'app/services/misc.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
import { InstCampusService } from 'app/services/inst-campus.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  formdata: User;
  campusList: any[];
  roleList: any[];
  provinceList: any[];
  modelPattern = appPattern;
  tempArr:any;
  currentUser: Login;
  countryFilter: any = '';
  countryList: any[];
  userImage: File;
  institutionId: number = 0;

  filepath = environment.filepath + 'User/'
  roleType: number = 0;
  provinceFilter:string='';
  contryFilter:string='';
  roleFilter:string='';
  
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private userService: UserService,
    private roleService: RoleService,
    private toasterService: ToasterService,
    private authService: AuthenticationService,
    private miscService: MiscService,
    private uploadSercvice: UploadService,
    private instcampusService: InstCampusService,
    private mandatoryfieldCheckService: MandatoryfieldCheckService
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.institutionId = this.currentUser.RefId;
  }

  ngOnInit() {
    this.formdata = {
      UserId: 0,
      DisplayName: "",
      UserName: "",
      MobileNo: "",
      EmailId: "",
      UPassword: "",
      isActive: 1,
      RoleId: this.currentUser.RoleId === 2 ? 2 : 0,
      ProfileImage: "",
      isDefault: 0,
      ResetOnNextLogin: 0,
      SendMail: 0,
      RefId: this.currentUser.RoleId === 2 ? this.currentUser.RefId : 0,
      ReportTo: this.currentUser.RoleId === 2 ? this.currentUser.UserId : 0,
      SkypeId: '',
      InstEmail: '',
      InstUser: '',
      InstPassword: '',
      InstSMTPServer: '',
      InstSMTPPort: '',
      InstSSL: false,
      OfficeEmail: '',
      OfficeUser: '',
      OfficePassword: '',
      OfficeSMTPServer: '',
      OfficeSMTPPort: '',
      OfficeSSL: false,
      City: '',
      ZipCode: '',
      State: '',
      CampusId: '',
      ProvinceId: '',
    };
    this.getUser();
    this.listCampus();
    this.fillCountry();
    this.getRole();
  }

  onFileChange(value: File) {
    this.uploadSercvice.uploadFileWithoutProgress('user', value).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formdata.ProfileImage = res[0];
      this.userService.UpdateProfilePath(this.formdata.UserId, this.formdata.ProfileImage).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "Profile picture updated successfully");
      });
    });
  }


  removePicture() {
    this.userService.UpdateProfilePath(this.formdata.UserId, '').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.toasterService.pop("success", "Profile picture removed successfully");
      this.formdata.ProfileImage = '';
    });
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      this.mandatoryfieldCheckService.setinvalidFields();
      return;
    }

    if (this.userImage) {
      this.uploadSercvice.uploadFileWithoutProgress('user', this.userImage).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata.ProfileImage = res[0];
        this.userImage = undefined;
        this.onSubmit(form);
      });
      return;
    }

    this.userService.profileUpdate(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.toasterService.pop("success", "Profile updated successfully");
    });

  }


  getRole() {
    this.roleService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.roleList = res;
      this.getRoleType();
    });
  }

  getRoleType() {
    if (this.roleList && this.formdata.UserId > 0) {
      this.roleType = this.roleList.find(value => value.RoleId === this.formdata.RoleId).RoleType;
    }
  }

  listCampus() {
    this.instcampusService.list(this.institutionId).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.campusList = res;
    });
  }

  getUser() {
    this.userService.profileGet().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formdata = res as User;
      this.tempArr=JSON.stringify(res as User);
      this.listCampus();
      if (this.formdata.CountryId != undefined || this.formdata.CountryId != null) {
        this.listProvince(this.formdata.CountryId);
      }
    });

  }
  fillCountry() {
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
      });
  }

  changeOptionCountry(val) {
    if (val !== undefined) {
      this.listProvince(val);
    }
  }

  listProvince(countryId) {
    this.miscService.province(countryId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.provinceList = res;
    });
  }

  isFormValueUpdated()
  {
    if(JSON.stringify(this.formdata)===this.tempArr)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
