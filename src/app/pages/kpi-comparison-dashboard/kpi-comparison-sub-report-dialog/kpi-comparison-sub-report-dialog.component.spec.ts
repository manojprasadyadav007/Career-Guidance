import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiComparisonSubReportDialogComponent } from './kpi-comparison-sub-report-dialog.component';

describe('KpiComparisonSubReportDialogComponent', () => {
  let component: KpiComparisonSubReportDialogComponent;
  let fixture: ComponentFixture<KpiComparisonSubReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiComparisonSubReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiComparisonSubReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
