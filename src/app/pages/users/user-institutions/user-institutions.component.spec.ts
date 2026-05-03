import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInstitutionsComponent } from './user-institutions.component';

describe('UserInstitutionsComponent', () => {
  let component: UserInstitutionsComponent;
  let fixture: ComponentFixture<UserInstitutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInstitutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
