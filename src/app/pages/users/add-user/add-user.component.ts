import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'app/models/user-model';
import { Location } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RoleService } from 'app/services/role.service';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { appPattern, sitemap } from 'app/models/site-map.model';
import { SubTitleService } from 'app/services/sub-title.service';
import { UploadService } from 'app/services/upload.service';
import { environment } from 'environments/environment';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
import { InstituteService } from 'app/services/institute.service';
import { PreviousRouteService } from 'app/services/previousPath.service';
import { MSMAgentService } from 'app/services/msmagent.service';
import { InstCampusService } from 'app/services/inst-campus.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  id: number;
  formdata: User;
  roleList: any[];
  provinceList: any[];
  campusList: any[];
  tabindex: number = 0;
  roleFilter: any = '';
  reportFilter: any = '';
  modelPattern = appPattern;
  provinceFilter: any;
  countryFilter: any = '';
  currentUser: Login;
  permission: number = 0;
  roleSelectAllowed: boolean = false;
  userImage: File;
  AgentId: any;
  tempArr:any;
  filepath = environment.filepath + 'User/'
  isPri: any;
  managerList: any[];
  roleType: number = 0;
  querydata: any = {};
  disablebStatus: boolean = false;
  departmentList: any[];
  isRefPresent: any;
  refId: any;
  campusId: any;
  instFilter: string = '';
  campusFilter: string = '';
  instList: any[];
  countryList: any[];
  previousUrl: any;
  agentList: any[];
  agentFilter: string = '';
  inst_campus: boolean = false;
  data: boolean = false;
  private onDestroy$: Subject<void> = new Subject<void>();
  contryFilter:string='';

  constructor(private userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private authService: AuthenticationService,
    private router: Router,
    private subTitleService: SubTitleService,
    private uploadSercvice: UploadService,
    private miscService: MiscService,
    private instcampusService: InstCampusService,
    private mandatoryfieldCheckService: MandatoryfieldCheckService,

    private location: Location,
    private previousRouteService: PreviousRouteService,
    private instituteService: InstituteService,
    private agentService: MSMAgentService
  ) {
    this.querydata = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state : {};
    this.currentUser = this.authService.currentUserSubject.getValue();



    this.permission = this.authService.checkPermission(sitemap.Users);
    if (this.currentUser.RoleId === 2) {
      this.roleSelectAllowed = false;
    }
    if (!this.querydata.hasOwnProperty('roleID')) {
      this.disablebStatus = true;
    }
  }

  ngOnInit() {
    this.previousUrl = this.previousRouteService.getPreviousUrl();

    if (this.permission <= 0) {
      this.router.navigate(['/member/users']);
    }
    if (this.currentUser.RoleType === 1) {
      this.instituteService.forDDL()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(res => {
          this.instList = res;
        });

      this.agentService.forDDL()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((res: any) => {
          this.agentList = res;
          this.getReferenceIndex();
        });

    }


    this.miscService.department().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.departmentList = res;
    });

    this.route.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.tabindex = res['show'] | 0;
    });

    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.id = +param.get("id") | 0;
      this.resetForm(null);
    });
    this.listManager();
    this.getRole();
    this.fillCountry();
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  resetForm(form?: NgForm) {
    this.formdata =
    {
      UserId: 0,
      DisplayName: "",
      UserName: "",
      MobileNo: "",
      EmailId: "",
      UPassword: "",
      isActive: 1,
      RoleId: 0,
      ProfileImage: "",
      isDefault: 0,
      ResetOnNextLogin: 0,
      SendMail: 0,
      RefId: 0,
      ReportTo: 0,
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
      CampusId: 0,
      ProvinceId: 0,

    }


    if (this.currentUser.RoleId === 2 || this.currentUser.RoleId === 100 || this.currentUser.RoleId === 1) {
      this.formdata.RoleId = this.currentUser.RoleId;
      this.formdata.RefId = this.currentUser.RefId;
      this.formdata.ReportTo = this.currentUser.UserId;
    }

    if (form != null) {
      form.resetForm();
    }

    if (this.id > 0) {
      this.getUser();
    }
    else {
      this.roleSelectAllowed = true;
    }
  }

  onFileChange(value: File) {

    if (this.id > 0) {
      this.uploadSercvice.uploadFileWithoutProgress('user', value).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata.ProfileImage = res[0];
        this.userService.UpdateProfilePath(this.id, this.formdata.ProfileImage).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.toasterService.pop("success", "Profile picture updated successfully");
        });
      });
    }
  }

  removePicture() {
    if (this.id > 0) {
      this.userService.UpdateProfilePath(this.id, '').pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "Profile picture removed successfully");
        this.formdata.ProfileImage = '';
      });
    }
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.mandatoryfieldCheckService.setinvalidFields();
      return;
    }

    if (this.id === 0) {

      if (this.userImage) {
        this.uploadSercvice.uploadFileWithoutProgress('user', this.userImage).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.formdata.ProfileImage = res[0];
          this.userImage = undefined;
          this.onSubmit(form);
        });
        return;
      }

      this.formdata.EmailId = this.formdata.UserName;

      // if (this.disablebStatus == false) {
      //   this.querydata.roleID == '100' ? (this.formdata.RefId = this.querydata.Id, this.formdata.RoleId = 100) : this.formdata.RoleId = 2;
      // }



      if (this.disablebStatus == false) {
        this.formdata.RefId = this.querydata.Id;
        this.formdata.RoleId = this.querydata.roleID;
      }


      this.userService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "User saved successfully");
        if (this.previousUrl.split("/").includes("edit-institutions") || this.previousUrl.split("/").includes("edit-agent")) {
          this.location.back();
          return;
        }
        if (this.formdata.RoleId > 100 || (this.formdata.RoleId === 100 && +res.isPrimary === 0) || this.formdata.RoleId === 2) {
          this.router.navigate(["member/users/edit-user/" + res.UserId], { queryParams: { show: 1 }, skipLocationChange: true });
        }
        else {
          // if( this.previousUrl.split("/").includes("edit-institutions ||  this.previousUrl.split("/").includes("edit-agent")){
          //   this.location.back();
          //   return;
          // } 
          this.router.navigate(["member/users"])
        }

      });
    }
    else {
      this.userService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "User updated successfully");
        this.location.back();
        // this.router.navigate(["member/users"])
      });
    }

  }

  getReferenceIndex() {
    if (this.agentList && this.agentList.length > 0 && this.formdata.UserId > 0) {
      this.isRefPresent = this.agentList.findIndex(AgentList => AgentList.AgentId === this.formdata.RefId);
    }
  }

  listCampus(inst_id) {
    this.instcampusService.list(inst_id).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.campusList = res;
    });
  }

  changeOption(inst_id) {
    this.listCampus(inst_id);
    this.inst_campus = true;
  }

  getUser() {
    this.userService.get(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.formdata = res as User;
      let temp:any=res as User;
      temp.UPassword='';
      this.tempArr=JSON.stringify(temp);  
      this.listCampus(this.formdata.RefId);
      if (this.formdata.CountryId != undefined || this.formdata.CountryId != null) {
        this.listProvince(this.formdata.CountryId);
      }
      this.formdata.UserId = this.id;
      this.formdata.UPassword = '';
      if (this.formdata.RoleId === 1 || this.formdata.RoleId > 100) {
        this.roleSelectAllowed = true;
      }
      this.getRoleType();
      this.subTitleService.name.next(this.formdata.DisplayName);
      this.getReferenceIndex();
    });
  }

  getRole() {
    this.roleService.forDDL().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.roleList = res;
      this.getRoleType();
    });
  }

  getRoleType() {
    if (this.roleList) {
      this.roleType = this.roleList.find(value => value.RoleId === this.formdata.RoleId).RoleType;
    }
  }

  changeRole(){
      this.getRoleType();
  }

  listManager() {
    if (this.currentUser.RoleId != 2) {
      this.userService.forDDL('', '2,3,4', 0, 0, this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.managerList = res.filter(value => +value.UserId != this.id);
      });
    }
  }
  cancel() {
    this.location.back();
  }

  fillCountry() {
    this.miscService.country()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.countryList = res;
      });
  }

  changeOptionCountry(val,reset?:boolean) {
    if(reset){
      this.formdata.ProvinceId=null;
    }
    if (val != undefined) {
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

}
