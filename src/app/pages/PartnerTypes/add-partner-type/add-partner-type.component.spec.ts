import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnerTypeComponent } from './add-partner-type.component';

describe('AddPartnerTypeComponent', () => {
  let component: AddPartnerTypeComponent;
  let fixture: ComponentFixture<AddPartnerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartnerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartnerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
