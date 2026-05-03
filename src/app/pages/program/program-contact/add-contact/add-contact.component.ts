import { Component, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProgramContactService } from 'app/services/program-contact.service';
import { element } from 'protractor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProgramContact } from 'app/models/program-contact-model';
import { User } from 'app/models/user-model';
import { AuthenticationService } from 'app/services/authentication.service';
import { Login } from 'app/models/login.model';
import { appPattern } from 'app/models/site-map.model';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ToasterService } from 'angular2-toaster';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit, OnDestroy {
  formdata: ProgramContact;
  programId: number = 0;
  isAdd: boolean = false;
  closeAfterAdd: boolean;
  flagdisabled: boolean = false;
  ContactFilter: any = "";
  currentUser: Login;
  userList: any[];
  modelPattern = appPattern;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private programContactService: ProgramContactService,
    private dialogRef: MatDialogRef<AddContactComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private userService: UserService,
    private authService: AuthenticationService,
    private toasterService: ToasterService
  ) {
    this.programId = data.programId;
    if (data.closeAfterAdd === undefined) {
      this.closeAfterAdd = true;
    }
    else {
      this.closeAfterAdd = data.closeAfterAdd;
    }
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUserSubject.getValue();
    this.resetForm();
    this.forDropDownProgramContact();
  }


  forDropDownProgramContact(){
    this.userService.forDropDownProgramContact().pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
      this.userList = res;
    });
  }



  resetForm() {
    this.formdata = {
      ContactId: 0,
      ContactUserId: '',
      //  Email:'',
      //  ContactNo:'',
      ProgramId: this.programId,
      AddUserId: this.currentUser.UserId
    };
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.formdata.AddUserId = this.currentUser.UserId;
    this.flagdisabled = true;
    this.programContactService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {


    if(+res > 0 || res === 'OK'){
      this.toasterService.pop('success','Contact saved successfully');
      this.isAdd = true;
      if (this.closeAfterAdd) {
      this.close();
      }
      else {
      form.reset();
      this.resetForm();
      }
      }else{
      this.toasterService.pop('error', res);
      }
      this.flagdisabled =false;
      }, err =>{
      this.flagdisabled =false;
      });
  }

  close() {
    this.dialogRef.close(this.isAdd);
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
