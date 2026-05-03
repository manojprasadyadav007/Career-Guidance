import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateInstitutesComponent } from './associate-institutes.component';

describe('AssociateInstitutesComponent', () => {
  let component: AssociateInstitutesComponent;
  let fixture: ComponentFixture<AssociateInstitutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateInstitutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateInstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
