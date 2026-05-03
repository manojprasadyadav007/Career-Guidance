import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedAgentComponent } from './assigned-agent.component';

describe('AssignedAgentComponent', () => {
  let component: AssignedAgentComponent;
  let fixture: ComponentFixture<AssignedAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
