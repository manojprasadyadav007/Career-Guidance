import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketActivityChartComponent } from './market-activity-chart.component';

describe('MarketActivityChartComponent', () => {
  let component: MarketActivityChartComponent;
  let fixture: ComponentFixture<MarketActivityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketActivityChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketActivityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
