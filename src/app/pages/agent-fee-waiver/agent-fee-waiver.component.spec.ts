import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFeeWaiverComponent } from './agent-fee-waiver.component';

describe('AgentFeeWaiverComponent', () => {
  let component: AgentFeeWaiverComponent;
  let fixture: ComponentFixture<AgentFeeWaiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentFeeWaiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentFeeWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
