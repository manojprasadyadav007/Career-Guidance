import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationGrowthComponent } from './student-application-growth.component';

describe('StudentApplicationGrowthComponent', () => {
  let component: StudentApplicationGrowthComponent;
  let fixture: ComponentFixture<StudentApplicationGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentApplicationGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApplicationGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
