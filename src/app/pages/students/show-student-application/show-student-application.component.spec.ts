import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentApplicationComponent } from './show-student-application.component';

describe('ShowStudentApplicationComponent', () => {
  let component: ShowStudentApplicationComponent;
  let fixture: ComponentFixture<ShowStudentApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStudentApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
