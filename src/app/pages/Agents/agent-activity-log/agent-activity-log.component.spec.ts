import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentActivityLogComponent } from './agent-activity-log.component';

describe('AgentActivityLogComponent', () => {
  let component: AgentActivityLogComponent;
  let fixture: ComponentFixture<AgentActivityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentActivityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
