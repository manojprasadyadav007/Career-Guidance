import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportExpiryReportComponent } from './passport-expiry-report.component';

describe('PassportExpiryReportComponent', () => {
  let component: PassportExpiryReportComponent;
  let fixture: ComponentFixture<PassportExpiryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportExpiryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportExpiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
