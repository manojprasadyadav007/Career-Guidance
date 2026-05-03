import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment';
import { Login } from 'app/models/login.model';
import { InstituteService } from 'app/services/institute.service';
import { ProgramService } from 'app/services/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap } from 'app/models/site-map.model';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';
import { MiscService } from 'app/services/misc.service';
import { MatDialog } from '@angular/material';
import { SelectNationalityDialogComponent } from '../select-nationality-dialog/select-nationality-dialog.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-institution-page',
  templateUrl: './institution-page.component.html',
  styleUrls: ['./institution-page.component.scss']
})
export class InstitutionPageComponent implements OnInit, OnDestroy {

  filepath: string = environment.filepath + 'institution/';
  id: number;
  content: SafeHtml;
  instData: any;
  eventData: any[];
  parentRoute: string = "";
  currentUser: Login;
  permission: number;
  programList: any[];
  contactList: any[];
  searchData: any = { param1: '', param2: '' };

  disciplineList: any[];
  startDateandTime: any;
  instList: any[];
  filteredInstListObs: any[];
  filteredDisciplineListObs: any[];

  canApply: boolean = true;

  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private instService: InstituteService
    , private programService: ProgramService
    , private route: ActivatedRoute,
    private authService: AuthenticationService,
    private sanitizer: DomSanitizer
    , private embedService: EmbedVideoService
    , private miscService: MiscService
    , private router: Router
    , private matDialog: MatDialog
  ) {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.permission = this.authService.checkPermission(sitemap.Institutions);
  }

  ngOnInit() {

    this.authService.currentUserSubject.pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.currentUser = res;
      if (this.currentUser.UserId > 0) {
        this.parentRoute = "member/";
        this.checkCanApply();
      }
    });



    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.id = +param.get("id") | 0;
      this.getBasicDetail();
      this.getContactDetails();
      this.getPrograms();
      this.UpcommingEvents();
    });

    this.miscService.instPageListParam1().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.disciplineList = res;
    });

    this.miscService.instPageListParam2().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.instList = res;
    });


  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  // for agent user check institutite is authorized or not hide apply button if not authorized
  checkCanApply() {

    if (this.currentUser.RoleId === 2) {
      this.canApply = false;
      this.authService.assignedInstitutionIds().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        if (res.length > 0) {
          if (res.findIndex(d => +d === +this.id) >= 0) {
            this.canApply = true;
          }
        }
      });
    }
  }

  getBasicDetail() {
    this.instService.getDetail(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.instData = res;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.instData.InstAbout);
    });
  }

  UpcommingEvents() {
    this.instService.getUpcommingEvents(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.eventData = res;
    });
  }

  getPrograms() {
    this.programService.forInstPage(this.id).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      var groupByName = [];
      var count = 0;
      res.forEach(function (a) {
        var index = groupByName.findIndex(v => v.level === a.ProgramLevel);

        if (index >= 0) {
          groupByName[index].programs.push(a);
        }
        else {
          groupByName.push({ level: a.ProgramLevel, programs: [a], index: count++ });
        }
      });

      this.programList = groupByName;

    });
  }
  getMapUrl(value: string, near: string) {
    return this.sanitizeUrl("https://maps.google.com/maps?q=" + encodeURIComponent(value) + "&ll=" + encodeURIComponent(near) + "center=" + encodeURIComponent(near) + "&near=" + encodeURIComponent(near) + "&t=&z=13&ie=UTF8&iwloc=&output=embed")
  }



  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getVideoCode(value: string) {
    return this.embedService.embed(value, { attr: { width: '100%', height: 800, allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" } })
  }

  filterParam1(value: string) {
    if (value) {
      this.filteredDisciplineListObs = this.disciplineList
        .map(group => ({ label: group.label, data: this._filterParam1(group.data, value) }))
        .filter(group => group.data.length > 0);
      return;
    }
    this.filteredDisciplineListObs = [];
  }

  _filterParam1 = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();

    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  };


  filterParam2(value: string) {

    if (value) {
      this.filteredInstListObs = this.instList
        .map(group => ({ label: group.label, data: this._filterParam2(group.data, value, group.label) }))
        .filter(group => group.data.length > 0);
      return;
    }
    this.filteredInstListObs = [];
  }

  _filterParam2 = (opt: any[], value: string, label: string): string[] => {
    if (label.toLowerCase() === 'country') {
      return opt.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));
    }
    else {
      return opt.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
        || (item.code != '' && item.code.toLowerCase().startsWith(value.toLowerCase())));
    }
  }

  search() {
    if (localStorage.getItem('nationality')) {
      if (this.currentUser.UserId > 0) {
        this.router.navigateByUrl('/member/program-search?param1=' + this.searchData.param1 + '&param2=' + this.searchData.param2);
      }
      else {
        this.router.navigateByUrl('/search?param1=' + this.searchData.param1 + '&param2=' + this.searchData.param2);
      }
    }
    else {
      this.showSelectNationality();
    }
  }


  showSelectNationality() {
    this.matDialog.open(SelectNationalityDialogComponent, { width: '50%', minWidth: '400px', closeOnNavigation: true }).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        localStorage.setItem('nationality', res);
        this.search();
      }
    });
  }

  getContactDetails() {
    this.instService.listContactForInstitute(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.contactList = res;
    })
  }


}
