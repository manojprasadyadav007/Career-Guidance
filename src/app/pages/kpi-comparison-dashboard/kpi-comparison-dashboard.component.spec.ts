import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiComparisonDashboardComponent } from './kpi-comparison-dashboard.component';

describe('KpiComparisonDashboardComponent', () => {
  let component: KpiComparisonDashboardComponent;
  let fixture: ComponentFixture<KpiComparisonDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiComparisonDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiComparisonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
