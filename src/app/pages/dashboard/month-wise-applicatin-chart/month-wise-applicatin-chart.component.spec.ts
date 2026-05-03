import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthWiseApplicatinChartComponent } from './month-wise-applicatin-chart.component';

describe('MonthWiseApplicatinChartComponent', () => {
  let component: MonthWiseApplicatinChartComponent;
  let fixture: ComponentFixture<MonthWiseApplicatinChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthWiseApplicatinChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthWiseApplicatinChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
