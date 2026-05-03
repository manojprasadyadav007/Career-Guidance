import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationIntakeChartComponent } from './application-intake-chart.component';

describe('ApplicationIntakeChartComponent', () => {
  let component: ApplicationIntakeChartComponent;
  let fixture: ComponentFixture<ApplicationIntakeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationIntakeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationIntakeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
