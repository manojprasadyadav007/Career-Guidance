import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appPattern } from 'app/models/site-map.model';
import { MSMAgentService } from 'app/services/msmagent.service';
import { MiscService } from 'app/services/misc.service';
import { InstituteService } from 'app/services/institute.service';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';
import { EncryptionService } from 'app/services/encryption.service';


@Component({
  selector: 'app-agent1',
  templateUrl: './agent1.component.html',
  styleUrls: ['./agent1.component.scss']
})
export class Agent1Component implements OnInit, OnDestroy {

  formdata: any;
  countryList: any[];
  provinceList: any[];
  provinceFilter: any;
  result: string;
  companyLabel: string = "Company name";
  descLabel: string = "Company";
  modelPattern = appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  type: string = "agent"
  flagdisabled: boolean = false;
  statusFilter: string = '';

  providerName: string = '';
  providerId: string = '';
  email: string = '';
  providerNameLength: number = 0;
  isReadOnly = false;

  constructor(private agentService: MSMAgentService,
    private miscService: MiscService
    , private router: Router
    , private toasterService: ToasterService,
    private instituteService: InstituteService,
    private encryptionService: EncryptionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fillCountry();
    this.formdata = {
      AddUserId: 0,
      CompanyName: '',
      Email: '',
      Province: '',
      StreetAddress: '',
      Zipcode: '',
      Country: 0,
      City: '',
      checkTermsandServices: false
    }

    this.route.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      if(res.provider) {
        this.providerName = res.provider;
        this.providerNameLength = this.providerName.length
        this.providerId = res.providerId;
        this.formdata.Email = res.email;
        this.formdata.CompanyName = res.firstName + " " +res.lastName;
        this.isReadOnly = true;
      }
    });
 }

  signup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.flagdisabled = true;
    if(this.providerName) {
      this.formdata.ProviderName = this.providerName;
      this.formdata.ProviderId = this.providerId;
    }
    if (this.type == "agent") {
      this.agentService.signup(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res === "OK") {
          this.toasterService.pop('success', 'Register successfully, Login now');
          this.router.navigate(['/signin']);
        }
        else {
          this.result = null;
          this.toasterService.pop('error', res + '');
        }
        this.flagdisabled = false;
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {
      this.instituteService.signup(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res === "OK") {
          this.toasterService.pop('success', 'Register successfully, Login now');
          this.router.navigate(['/signin']);
        }
        else {
          this.result = null;
          this.toasterService.pop('error', res + '');
        }
        this.flagdisabled = false;
      }, err => {
        this.flagdisabled = false;
      });
    }
    //}
  }

  fillCountry() {
    this.miscService.country().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.countryList = res;
    });
  }

  fillprovince() {
    this.miscService.province(this.formdata.Country).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.provinceList = res;

    });
  }
  radioChange(evnt) {
    if (this.type == "agent") {
      this.companyLabel = "Company name";
      this.descLabel = "Company";
    } else {
      this.companyLabel = "Institution name";
      this.descLabel = "Institution";
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
