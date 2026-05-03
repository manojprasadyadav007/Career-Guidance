import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionableAlertsComponent } from './actionable-alerts.component';

describe('ActionableAlertsComponent', () => {
  let component: ActionableAlertsComponent;
  let fixture: ComponentFixture<ActionableAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionableAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionableAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
