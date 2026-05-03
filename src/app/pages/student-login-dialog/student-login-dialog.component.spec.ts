import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoginDialogComponent } from './student-login-dialog.component';

describe('StudentLoginDialogComponent', () => {
  let component: StudentLoginDialogComponent;
  let fixture: ComponentFixture<StudentLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLoginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
