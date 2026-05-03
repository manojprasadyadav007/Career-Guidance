import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDashboardComponent } from './kpi-dashboard.component';

describe('KpiDashboardComponent', () => {
  let component: KpiDashboardComponent;
  let fixture: ComponentFixture<KpiDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
