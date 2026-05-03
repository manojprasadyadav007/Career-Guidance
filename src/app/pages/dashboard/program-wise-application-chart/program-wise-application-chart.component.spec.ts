import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramWiseApplicationChartComponent } from './program-wise-application-chart.component';

describe('ProgramWiseApplicationChartComponent', () => {
  let component: ProgramWiseApplicationChartComponent;
  let fixture: ComponentFixture<ProgramWiseApplicationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramWiseApplicationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramWiseApplicationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
