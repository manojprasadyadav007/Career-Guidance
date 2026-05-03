import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdditionalRequirementComponent } from './add-additional-requirement.component';

describe('AddAdditionalRequirementComponent', () => {
  let component: AddAdditionalRequirementComponent;
  let fixture: ComponentFixture<AddAdditionalRequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdditionalRequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdditionalRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
