import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgramService } from 'app/services/program.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { environment } from 'environments/environment';
import { Login } from 'app/models/login.model';
import { sitemap } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-details-program',
  templateUrl: './details-program.component.html',
  styleUrls: ['./details-program.component.scss']
})
export class DetailsProgramComponent implements OnInit, OnDestroy {

  id: number;
  intabout: SafeHtml;
  duration: string;
  proabout: SafeHtml;
  programList: any[];
  contactList: any[];
  programData: any;
  intek: any[];
  parentRoute: string = "";
  currentUser: Login;
  filepath: string = environment.filepath + 'institution/';
  permission: number;

  canApply: boolean = true;

  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private programService: ProgramService
    , private route: ActivatedRoute
    , private authService: AuthenticationService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.authService.currentUserSubject.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (v) => {
        this.currentUser = v;
        if (this.currentUser.UserId > 0) {
          this.parentRoute = "member/";
        }
        this.permission = this.authService.checkPermission(sitemap.Institutions);
        // this.checkCanApply();
      }
    });

    this.route.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
      this.id = +param.get("id") | 0;
      this.getContactDetails();
      this.getBasicDetail();
      this.getPrograms();
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
      if (this.programData) {
        if (this.programData.PartnerTypeId === 2) {
          this.canApply = true;
          return true
        }
        this.authService.assignedInstitutionIds().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res.length > 0) {
            if (res.findIndex(d => +d === +this.programData.InstitutionId) >= 0) {
              this.canApply = true;
            }
          }
        });
      }
    }
  }

  getPrograms() {
    this.programService.otherProgramList(this.id).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
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

  getDuration = ((item: number) => {
    switch (item) {
      case 1: {
        return "Years";
        break;
      }
      case 2: {
        return "Months";
        break;
      }
      case 3: {
        return "Weeks";
        break;
      }
      case 4: {
        return "Credit Hours";
        break;
      }
    }
  });



  getBasicDetail() {
    this.programService.ForProgramPage(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.programData = res;
      this.intabout = this.sanitizer.bypassSecurityTrustHtml(this.programData.InstituteAbout);
      this.proabout = this.sanitizer.bypassSecurityTrustHtml(this.programData.Description);
      this.duration = this.getDuration(this.programData.DurationType);
      this.intek = this.programData.Inteks;
      this.intek = this.intek.map(function (e) {
        return {
          SubmissionDeadline: e.SubmissionDeadline,
          IntekDate: e.IntekDate
        }
      })
      this.checkCanApply();
    });
  }


  getContactDetails() {
    this.programService.listContactForProgram(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.contactList = res;
    })
  }


}
