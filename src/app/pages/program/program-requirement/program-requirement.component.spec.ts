import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramRequirementComponent } from './program-requirement.component';

describe('ProgramRequirementComponent', () => {
  let component: ProgramRequirementComponent;
  let fixture: ComponentFixture<ProgramRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
