import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { NewsService } from 'app/services/news.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap, editorlist } from 'app/models/site-map.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { LocaltimeToUtcPipe } from 'app/custom-pipes/localtime-to-utc/localtime-to-utc.pipe';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
  providers: [
    LocaltimeToUtcPipe
  ],
})
export class AddNewsComponent implements OnInit, OnDestroy {

  formdata: any = {
    NewsId: 0,
    NewsSubject: '',
    StartDate: '',
    EndDate: '',
    NewsStatus: 0,
    NewsDescription: '',
  }
  flagdisabled: boolean = false;
  permission: number = 0;
  popupVisible: boolean;
  isAdd: boolean = false;

  btnLabel: string = 'Add';
  items: any = Object.assign([], editorlist);
  currentUser: Login;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private newsService: NewsService,
    @Inject(MAT_DIALOG_DATA) data,
    private matDialogRef: MatDialogRef<AddNewsComponent>,
    authService: AuthenticationService,
    private localtoutc: LocaltimeToUtcPipe
  ) {

    this.currentUser = authService.currentUserSubject.getValue();
    this.permission = authService.checkPermission(sitemap.News);
    if (data && data.NewsId) {
      this.formdata.NewsId = data.NewsId;
    }

  }

  ngOnInit() {
    this.get();
    this.items.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
    });
  }

  add(form: NgForm) {
    let currentdate = new Date();
    let currentTime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    this.formdata.StartDate = this.localtoutc.transform(this.formdata.StartDate,currentTime);
    this.formdata.EndDate = this.localtoutc.transform(this.formdata.EndDate,currentTime);

    if (form.invalid) {
      return;
    }
    this.flagdisabled = true;
    if (this.formdata.NewsId > 0) {
      this.newsService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.flagdisabled = false;
        this.matDialogRef.close(true);
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {
      this.newsService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.flagdisabled = false;
        this.matDialogRef.close(true);
      }, err => {
        this.flagdisabled = false;
      });
    }
  }

  get() {
    if (this.formdata.NewsId > 0) {
      this.newsService.get(this.formdata.NewsId).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
        this.btnLabel = 'Update';
      });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
