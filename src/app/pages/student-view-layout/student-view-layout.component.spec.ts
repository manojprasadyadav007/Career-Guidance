import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewLayoutComponent } from './student-view-layout.component';

describe('StudentViewLayoutComponent', () => {
  let component: StudentViewLayoutComponent;
  let fixture: ComponentFixture<StudentViewLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentViewLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
