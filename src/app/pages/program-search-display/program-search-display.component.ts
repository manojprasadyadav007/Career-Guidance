import { Component, OnInit, Input, OnChanges, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-program-search-display',
  templateUrl: './program-search-display.component.html',
  styleUrls: ['./program-search-display.component.scss']
})
export class ProgramSearchDisplayComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  programList: any[];

  @Input()
  showApply: boolean = false;

  @Output()
  onApply: EventEmitter<any> = new EventEmitter();

  @Input()
  assignedInst: any[] = null;

  parentRoute: String = '';

  pageIndex: number = 1;

  currentUser: Login;



  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(authService: AuthenticationService) {

    this.currentUser = authService.currentUserSubject.getValue();

    if (this.currentUser.UserId > 0) {
      this.parentRoute = 'member/';
    }


  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnChanges() {
    if (this.programList) {
      this.pageIndex = 1;
      this.programList.forEach(value => {
        value.p = 1;
        value.canApply = (value.PartnerTypeId !== 1  ||this.checkCanApply(value.InstitutionId));
      });
    }
  }

  checkCanApply(instId: number) {
    if (this.currentUser.RoleId === 2) {
      if (this.assignedInst) {
        return this.assignedInst.findIndex(d => +d === instId) >= 0;
      }
      else {
        return false;
      }
    }
    else {
      return true;
    }
  }

}
