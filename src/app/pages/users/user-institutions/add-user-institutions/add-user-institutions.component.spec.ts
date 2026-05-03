import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserInstitutionsComponent } from './add-user-institutions.component';

describe('AddUserInstitutionsComponent', () => {
  let component: AddUserInstitutionsComponent;
  let fixture: ComponentFixture<AddUserInstitutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserInstitutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
