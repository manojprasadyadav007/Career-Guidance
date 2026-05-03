import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { Subject } from 'rxjs/internal/Subject';
import { StudentService } from 'app/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { SubTitleService } from 'app/services/sub-title.service';
import { sitemap } from 'app/models/site-map.model';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-display-student',
  templateUrl: './display-student.component.html',
  styleUrls: ['./display-student.component.scss']
})
export class DisplayStudentComponent implements OnInit , OnDestroy{

  formdata: any;
  parentName: string = 'Student';

  @Input()
  id: number;

  @Input()
  permission: number;

  @Input()
  isProfile: number = 0;

  currentUser: Login;



  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    authService: AuthenticationService,
    private subTitleService: SubTitleService,
  ) {
    this.currentUser = authService.currentUserSubject.getValue();
    this.permission = authService.checkPermission(sitemap.Students);
  }

  ngOnInit() {
    if (this.isProfile === 0) {
      this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(param => {
        this.id = +param.get("id") | 0;
        this.get();
      });
    }
    else
    {
      this.get();
    }
    
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


  get() {
    this.studentService.view(this.id)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
        this.updateSubTitle();
      });
  }

  updateSubTitle() {
    this.subTitleService.name.next(this.formdata.genInfo.StudentId +  ' / ' + this.formdata.genInfo.FirstName + ' ' + this.formdata.genInfo.LastName);
  }

  onUpdate(event: any) {
    this.get();
  }

}
