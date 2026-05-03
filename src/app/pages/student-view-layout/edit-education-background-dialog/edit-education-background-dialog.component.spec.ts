import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEducationBackgroundDialogComponent } from './edit-education-background-dialog.component';

describe('EditEducationBackgroundDialogComponent', () => {
  let component: EditEducationBackgroundDialogComponent;
  let fixture: ComponentFixture<EditEducationBackgroundDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEducationBackgroundDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEducationBackgroundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
