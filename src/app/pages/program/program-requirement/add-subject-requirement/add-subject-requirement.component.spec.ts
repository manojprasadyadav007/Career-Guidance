import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectRequirementComponent } from './add-subject-requirement.component';

describe('AddSubjectRequirementComponent', () => {
  let component: AddSubjectRequirementComponent;
  let fixture: ComponentFixture<AddSubjectRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubjectRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
