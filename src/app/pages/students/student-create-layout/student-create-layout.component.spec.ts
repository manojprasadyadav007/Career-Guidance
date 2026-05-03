import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCreateLayoutComponent } from './student-create-layout.component';

describe('StudentCreateLayoutComponent', () => {
  let component: StudentCreateLayoutComponent;
  let fixture: ComponentFixture<StudentCreateLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCreateLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
