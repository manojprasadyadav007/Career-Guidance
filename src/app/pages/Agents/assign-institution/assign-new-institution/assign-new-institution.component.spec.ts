import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignNewInstitutionComponent } from './assign-new-institution.component';

describe('AssignNewInstitutionComponent', () => {
  let component: AssignNewInstitutionComponent;
  let fixture: ComponentFixture<AssignNewInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignNewInstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignNewInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
