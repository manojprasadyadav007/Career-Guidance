import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'app/services/report.service';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { MiscService } from 'app/services/misc.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';


@Component({
  selector: 'app-display-program',
  templateUrl: './display-program.component.html',
  styleUrls: ['./display-program.component.scss']
})
export class DisplayProgramComponent implements OnInit, OnDestroy {

  searchData: any = { Nationality: null, param1: '', param2: '' }
  programList: any[];

  parentRoute: string = "";
  currentUser: Login;
  nationFilter:any='';
  nationalityList: any[];

  programIds:string='';

  instList:any[];
  filteredInstListObs:any[];
  filteredDisciplineListObs:any[];
  disciplineList:any[];

  private onDestroy$: Subject<void> = new Subject<void>();

  assignedInstList:any[]=null;

  constructor(private route: ActivatedRoute,
    private reportService: ReportService,
    private authService: AuthenticationService,
    private miscService: MiscService,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.getAssignedInst();
    if (localStorage.getItem('nationality')) {
      this.searchData.Nationality = +localStorage.getItem('nationality');
      this.onNationalityChange();
    }

    if (this.currentUser.UserId > 0) {
      this.parentRoute = "member/";
    }

    this.route.queryParamMap
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.searchData = { Nationality: this.searchData.Nationality | 0, param1: res.get('param1'), param2: res.get('param2') };
      // this.onSubmit();
    });

    this.miscService.instPageListParam1().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.disciplineList=res;
    });

    this.miscService.instPageListParam2().pipe(takeUntil(this.onDestroy$)).subscribe(res=>{
      this.instList = res;
    });

    this.miscService.countryListForSearchProgram()
    .pipe(takeUntil(this.onDestroy$)).subscribe(
      res => {
        this.nationalityList = res;
      }
    );
  }

  filterParam1(value: string) {
    if (value) {
      this.filteredDisciplineListObs= this.disciplineList
        .map(group => ({label: group.label, data: this._filterParam1(group.data, value)}))
        .filter(group => group.data.length > 0);
        return;
    }
    this.filteredDisciplineListObs= [];
  }

  _filterParam1 = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();
  
    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  };

  filterParam2(value: string){
    
    if (value) {
     this.filteredInstListObs = this.instList
        .map(group => ({label: group.label, data: this._filterParam2(group.data, value,group.label)}))
        .filter(group => group.data.length > 0);
        return;
    }
    this.filteredInstListObs = [] ;
  }
  _filterParam2 = (opt: any[], value: string,label:string): string[] => {
    if(label.toLowerCase()==='country')
    {
      return opt.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));
    }
    else{
      return opt.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 
        || (item.code!='' && item.code.toLowerCase().startsWith(value.toLowerCase())) );
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  onSubmit() {
    this.reportService.searchProgram(this.searchData)
    .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.programList = res;
      this.updateProgramIds();
    });
  }

  updateProgramIds() {
    this.programIds = '';

    if (this.programList && this.programList.length > 0) {
      let prg = [];
      // this.formdata.ProgramId = this.programList.map(res => {
      //   return res.programs.map(res1 => {
      //     return res1.ProgramId
      //   })
      // }).reduce(function (a, b) { return a.concat(b); }).join(",");
     
       this.programList.forEach(value=>{
        value.programs.forEach(element => {
          prg.push(element.ProgramId);
        });
       });

       this.programIds = prg.toString().replace(/ /g, "");
    }
  }

  onNationalityChange() {
    localStorage.setItem('nationality', this.searchData.Nationality);
    this.onSubmit();
  }

  getAssignedInst() {
    if (this.currentUser.RoleId === 2) {
      this.authService.assignedInstitutionIds().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.assignedInstList = res;
      });
    }
  }

}
