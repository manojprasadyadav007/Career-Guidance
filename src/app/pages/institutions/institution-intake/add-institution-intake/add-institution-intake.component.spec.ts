import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitutionIntakeComponent } from './add-institution-intake.component';

describe('AddInstitutionIntakeComponent', () => {
  let component: AddInstitutionIntakeComponent;
  let fixture: ComponentFixture<AddInstitutionIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInstitutionIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstitutionIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
