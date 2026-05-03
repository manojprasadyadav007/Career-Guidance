import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTaskDisplayComponent } from './dashboard-task-display.component';

describe('DashboardTaskDisplayComponent', () => {
  let component: DashboardTaskDisplayComponent;
  let fixture: ComponentFixture<DashboardTaskDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTaskDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTaskDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
