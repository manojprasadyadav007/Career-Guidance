import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitutionsComponent } from './add-institutions.component';

describe('AddInstitutionsComponent', () => {
  let component: AddInstitutionsComponent;
  let fixture: ComponentFixture<AddInstitutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInstitutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
