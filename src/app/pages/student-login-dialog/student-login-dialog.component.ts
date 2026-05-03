import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentService } from 'app/services/student.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-student-login-dialog',
  templateUrl: './student-login-dialog.component.html',
  styleUrls: ['./student-login-dialog.component.scss']
})
export class StudentLoginDialogComponent implements OnInit, OnDestroy {

  formdata: any;
  loginerror: string;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private dialogRef: MatDialogRef<StudentLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private authService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.formdata = { UserName: '', Password: '', LoginType: 0 }
  }

  login() {
    this.authService.login(this.formdata, true, true).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      var data = res as any;

      if (data.error) {
        this.loginerror = res.error;
        return;
      }

      if (data.rslt.RoleId != 3) {
        this.loginerror = "only login with student user";
      }
      else {
        this.dialogRef.close(data.rslt.RefId);
      }
    },
      err => {
        if (err.status === 404) {
          this.loginerror = "invalid username password";
        }
        else {
          this.loginerror = 'error in login';
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
