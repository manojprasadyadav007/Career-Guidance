import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGrowthDialogComponent } from './student-growth-dialog.component';

describe('StudentGrowthDialogComponent', () => {
  let component: StudentGrowthDialogComponent;
  let fixture: ComponentFixture<StudentGrowthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentGrowthDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGrowthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
