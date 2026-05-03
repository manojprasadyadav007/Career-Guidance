import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudentAppLayoutComponent } from './upload-student-app-layout.component';

describe('UploadStudentAppLayoutComponent', () => {
  let component: UploadStudentAppLayoutComponent;
  let fixture: ComponentFixture<UploadStudentAppLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStudentAppLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStudentAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
