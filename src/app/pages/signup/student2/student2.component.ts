import { Component, OnInit, OnDestroy } from '@angular/core';
import { appPattern } from 'app/models/site-map.model';
import { StudentService } from 'app/services/student.service';
import { ToasterService, BodyOutputType, Toast } from 'angular2-toaster';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-student2',
  templateUrl: './student2.component.html',
  styleUrls: ['./student2.component.scss']
})
export class Student2Component implements OnInit , OnDestroy {

  formdata: any;
  confirmpassword: string = '';
  result: string;

  modelPattern = appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private studentService: StudentService,
    private toasterService: ToasterService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formdata = {
      FirstName: '',
      MiddleName: '',
      LastName: '',
      DateOfBirth: '',
      MobileNo: '',
      Email: '',
      Language: '',
      Citizenship: 0,
      PassportNo: '',
      Password: ''
    };
  }

  signup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.studentService.signup(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res === "OK") {
        var toast: Toast = {
          type: 'success',
          title: 'Signup',
          body: 'Signup successfully, <br/> check your mail box and verify your email, <br /> for further processing',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.router.navigate(['/signin']);
      }
      else {
        this.toasterService.pop('error', res + '');
      }
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
