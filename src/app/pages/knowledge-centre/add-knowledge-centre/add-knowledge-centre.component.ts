import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Login } from 'app/models/login.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'app/services/authentication.service';
import { sitemap, editorlist, appPattern } from 'app/models/site-map.model';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { KnowledgeCentreService } from 'app/services/knowledge-centre.service';
import { StudentDocumentService } from 'app/services/student-document.service';
import { KnowledgeCategoryService } from '../../../services/knowledge-category.service';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-add-knowledge-centre',
  templateUrl: './add-knowledge-centre.component.html',
  styleUrls: ['./add-knowledge-centre.component.scss']
})
export class AddKnowledgeCentreComponent implements OnInit, OnDestroy {

  uploadDir = "knowledge-centre";
  formdata: any = {
    KnowledgeCID: 0,
    CategoryID: null,
    CategoryName: '',
    DocumentTitle: '',
    DocumentDescription: '',
    DocumentStatus: false,
    DisplayTo: 0
  }
  docList: any[] = [];
  modelPattern = appPattern;
  categoryList: any[];
  categoryFilter: any[];
  displaytoList = [
    { value: 0, viewValue: 'All' },
    { value: 1, viewValue: 'Institution' },
    { value: 2, viewValue: 'Agent' },
    { value: 3, viewValue: 'Team' }
  ]

  flagdisabled: boolean = false;
  permission: number = 0;
  popupVisible: boolean;
  isAdd: boolean = false;

  btnLabel: string = 'Add';
  items: any = Object.assign([], editorlist);
  currentUser: Login;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private knowledgeCentreService: KnowledgeCentreService,
    private KnowledgeCategoryService: KnowledgeCategoryService,
    @Inject(MAT_DIALOG_DATA) data,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<AddKnowledgeCentreComponent>,
    authService: AuthenticationService,
    private studentDocumentService: StudentDocumentService
  ) {

    this.currentUser = authService.currentUserSubject.getValue();
    this.permission = authService.checkPermission(sitemap.KnowledgeCentre);
    if (data && data.KnowledgeCID) {
      this.formdata.KnowledgeCID = data.KnowledgeCID;
    }

  }

  ngOnInit() {
    this.get();
    this.items.push({
      text: 'Show markup',
      stylingMode: 'text',
      onClick: () => this.popupVisible = true
    });
    this.list();
  }

  add(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.flagdisabled = true;
    if (this.formdata.KnowledgeCID > 0) {
      this.knowledgeCentreService.update(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.flagdisabled = false;
        this.matDialogRef.close(true);
      }, err => {
        this.flagdisabled = false;
      });
    }
    else {
      this.knowledgeCentreService.add(this.formdata).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

        this.flagdisabled = false;


        let documentsList = {
          ParentId: +res,
          ParentType: 13,
          Documents: this.docList
        }
        if (documentsList.Documents.length > 0) {
          this.studentDocumentService.AddBulkWithName(documentsList).pipe(takeUntil(this.onDestroy$)).subscribe((res) => {
          });
        }

        this.matDialogRef.close(true);
      }, err => {
        this.flagdisabled = false;
      });
    }
  }

  list() {
    this.KnowledgeCategoryService.list().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.categoryList = res;
    });
  }

  getArray($event) {
    this.docList = $event;
  }
  get() {
    if (this.formdata.KnowledgeCID > 0) {
      this.knowledgeCentreService.get(this.formdata.KnowledgeCID).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.formdata = res;
        this.btnLabel = 'Update';
      });
    }
  }

  showcategory() {

    this.matDialog.open(AddCategoryDialogComponent).afterClosed().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res) {
        this.list();
      }
    });
  }



  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
