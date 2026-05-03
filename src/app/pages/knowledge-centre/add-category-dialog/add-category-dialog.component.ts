import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { Login } from 'app/models/login.model';
import { AuthenticationService } from 'app/services/authentication.service';
import { ToasterService } from 'angular2-toaster';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MatDialog } from '@angular/material/dialog';
import { KnowledgeCategoryService } from '../../../services/knowledge-category.service';
import { ConfirmBoxComponent } from 'app/utility/confirm-box/confirm-box.component';
import { sitemap } from 'app/models/site-map.model';
import { ActivityLogService } from 'app/services/activity-log.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent implements OnInit, OnDestroy {

  formdata: any = {
    CategoryName: null,
    ParentCategory: null,
    CategoryId: 0,
  };

  dataList: any[];
  columns: any[] = [
    {
      dataField: 'CategoryName',
      title: 'Category Name',
      type: '',
      format: ''
    },
    {
      dataField: 'ParentCategory',
      title: 'Parent Category',
      type: '',
      format: ''
    }
  ];
  gridMessage: string = 'No data';
  categoryId: number;
  categoryList: any[];
  showFilterRow: boolean = false;
  flagdisabled: boolean = false;
  isChange: boolean = false;
  currentUser: Login;
  categoryFilter: any[];
  isDisplayed = true;
  private onDestroy$: Subject<void> = new Subject<void>();

  showForm: boolean = false;
  excel_permisson: number = 0;

  constructor(private toasterService: ToasterService,
    authService: AuthenticationService,
    private knowledgeCategoryService: KnowledgeCategoryService,
    private matDialog: MatDialog,
    private activityLog: ActivityLogService) {
    this.currentUser = authService.currentUserSubject.getValue();
    this.excel_permisson = authService.checkPermission(sitemap.Excel_Export);
  }

  ngOnInit() {
    this.list();
  }

  submitform(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.flagdisabled = true;

    if (this.formdata.CategoryId) {
      this.knowledgeCategoryService.update(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.toasterService.pop('success', 'Knowledge category updated successfully');
            this.isChange = true;
            this.flagdisabled = false;
            this.resetForm(form);
            this.list();
          }
        }, err => {
          this.flagdisabled = false;
        });
    }
    else {
      this.knowledgeCategoryService.add(this.formdata)
        .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res) {
            this.toasterService.pop('success', 'Knowledge category saved successfully');
            this.isChange = true;
            this.flagdisabled = false;
            this.resetForm(form);
            this.list();
          }
        }, err => {
          this.flagdisabled = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  resetForm(form?: NgForm) {
    this.formdata = {
      CategoryName: null,
      ParentCategory: null,
    };
    if (form) {
      form.resetForm(this.formdata);
    }
    this.showForm = false;
  }


  list() {
    this.gridMessage = 'Loading';
    this.knowledgeCategoryService.list()
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.dataList = res;
        this.gridMessage = 'No data';
        this.categoryList = res;
      });
  }

  delete(id: number) {

    this.matDialog.open(ConfirmBoxComponent).afterClosed()
      .pipe(takeUntil(this.onDestroy$)).subscribe(resConfirm => {
        if (resConfirm) {
          this.knowledgeCategoryService.delete(id)
            .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              this.toasterService.pop('success','Knowledge category deleted successfully');
              this.isChange = true;
              this.resetForm();
              this.list();
            });

        }
      });
  }

  edit(id: number) {
    this.knowledgeCategoryService.get(id)
      .pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
        this.showForm = true;
      });
  }


  add(form: NgForm) {
    this.resetForm(form);
    this.showForm = true;
  }

  
activitylog(){
  this.activityLog.activitylog(0, 'Knowledge Base', 'Knowledge Category Export').pipe(takeUntil(this.onDestroy$)).subscribe();
}

  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      template: 'toolbarButton'
    });
  }

}
