import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentFeeWaiverComponent } from './add-agent-fee-waiver.component';

describe('AddAgentFeeWaiverComponent', () => {
  let component: AddAgentFeeWaiverComponent;
  let fixture: ComponentFixture<AddAgentFeeWaiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgentFeeWaiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgentFeeWaiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
