import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateInstitutesPopupComponent } from './associate-institutes-popup.component';

describe('AssociateInstitutesPopupComponent', () => {
  let component: AssociateInstitutesPopupComponent;
  let fixture: ComponentFixture<AssociateInstitutesPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateInstitutesPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateInstitutesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
