import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgramService } from 'app/services/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Program } from 'app/models/program-model';
import { Campus } from 'app/models/campus-model';
import { MiscService } from 'app/services/misc.service';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from 'app/services/authentication.service';
import { InstCampusService } from 'app/services/inst-campus.service';
import { Login } from 'app/models/login.model';
import { sitemap, enumToArray, programModes, editorlist, appPattern } from 'app/models/site-map.model';
import { SubTitleService } from 'app/services/sub-title.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MandatoryfieldCheckService } from 'app/services/mandatoryfield-check.service';
import { TabService } from 'app/services/tab-service';
@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit, OnDestroy {

  tabIndex: number = 0;
  optionDisabled: boolean = false;
  parentName: string = 'Program';
  btnLabel: string = "Save";
  id: number;
  ProgramIntakeInfo:any;
  instituteId: number;
  formdata: Program;
  campusList: Campus[];
  campusFilter:any;
  leveleduFilter:any;
  requirementSubjectInfo:any;
  currencyList: string[];
  desciplineList: any[];
  eduLevelList: any[];
  disciplineFilter: any = '';
  splFilter: any = '';
  modeFilter: any = '';
  CurrencyFilter: any = '';
  currentUser: Login;
  permission: number = 0;
  flagdisabled: boolean = false;
  specializationList: any[];
  popupVisible: boolean;
  items: any = Object.assign([], editorlist);
  private onDestroy$: Subject<void> = new Subject<void>();
  programModeList: any[] = enumToArray(programModes);

  modelPattern = appPattern;

  constructor(private programService: ProgramService,
    private route: ActivatedRoute,
    private router: Router,
    private miscService: MiscService,
    private toasterService: ToasterService,
    private authService: AuthenticationService,
    private instCampusService: InstCampusService,
    private subTitleService: SubTitleService,
    private mandatoryfieldCheckService: MandatoryfieldCheckService,
    private tabService : TabService,
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
  }

  ngOnInit() {
    this.items.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
  });

    if(this.currentUser.RoleType === 2) {
      this.instituteId = this.currentUser.RefId;
      this.permission = this.authService.checkPermission(sitemap.Programs);
    }
    else
    {
      this.permission = this.authService.checkPermission(sitemap.Institutions);
    }
    
    // if (this.permission <= 0) {
    //   this.router.navigate(['/member/unauthorized']);
    //   return;
    // }

    this.miscService.specialization()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => this.specializationList = res);

    this.fillCurrency();
    this.fillDescipline();
    this.fillEduLevel();

    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.id = +param.get("id") | 0;
      this.instituteId = +param.get("institutionid") | 0;
      this.resetForm(null);
      this.fillCampus();
    });
  }

  resetForm(form?: NgForm) {

    this.formdata =
    {
      ProgramId: 0,
      InstitutionId: this.instituteId,
      ProgramName: "",
      ProgramCode: "" ,
      DurationTime: "",
      DurationType: 1,
      NoOfSemester: "",
      ApplicationFee: 0,
      TutionFee: 0,
      ProgramStatus: 1,
      OfferLetterTAT: "",
      AddUserId: this.currentUser.UserId,
      ProgramCurrency: '',
      Campus: [],
      ProgramDescipline: [],
      ProgramLevel: 0,
      ProgramLink: '',
      Description: '',
      AverageProcessingDay: '',
      onCampus: false,
      offCampus: false,
      homeStay: false,
      privateAccomodation: false,
      postGraduateWithWork: false,
      programWithCoOpOption: false,
      conditionalOfferLetter: false,
      workWhileStudy: false,
      searchPriority: 0,
      ProgramModes: [],
      SpecializationId: []
    }
    if (form != null) {
      form.resetForm();
    }
    if (!(this.id === 0)) {
      this.getProgram();
    }
  }



  onSubmit(form: NgForm) {

    if (form && !form.valid) {
      this.mandatoryfieldCheckService.setinvalidFields();
      return;
    }
    this.flagdisabled = true;
    if (this.id === 0) {
      this.programService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata.ProgramId = +res;
        this.flagdisabled = false;
        this.toasterService.pop("success", "Program saved successfully");
        this.router.navigate(["member/institutions/programs/edit-program", this.instituteId, this.formdata.ProgramId])
      }, err => {
        this.flagdisabled = false;
      }
      );
    }
    else {
      this.programService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.toasterService.pop("success", "Program updated successfully");
        this.flagdisabled = false;
        this.router.navigate(["member/institutions/programs", this.instituteId])

      }, err => {
        this.flagdisabled = false;
      });
    }
  }

  getProgram() {
    this.programService.get(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.btnLabel = "Update";
      this.formdata = res;
      this.formdata.ProgramId = this.id;
      this.subTitleService.name.next(this.formdata.ProgramName);
    });
  }

  fillCampus() {
    this.instCampusService.list(this.instituteId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.campusList = res;
    })
  }

  

  fillCurrency() {
    this.miscService.currency().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.currencyList = res;
    })
  }

  fillEduLevel() {
    this.miscService.eduLevel().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.eduLevelList = res;
    });
  }

  fillDescipline() {
    this.miscService.desciplines().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.desciplineList = res;
    });
  }

  onTabPanelClick(evt, tab){
    this.sendActiveTabInfo(evt);
//    this.tabService.getTab(evt.index  , this.pageName);   
  }
  sendActiveTabInfo(event) {
    switch (event.tab.textLabel) {
      case 'Intake':
        this.ProgramIntakeInfo= 'Intake';
        break;
        case 'Requirement':
          this.requirementSubjectInfo= 'Subject';
          break;
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
