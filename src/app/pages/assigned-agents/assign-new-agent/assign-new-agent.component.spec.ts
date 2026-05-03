import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignNewAgentComponent } from './assign-new-agent.component';

describe('AssignNewAgentComponent', () => {
  let component: AssignNewAgentComponent;
  let fixture: ComponentFixture<AssignNewAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignNewAgentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignNewAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
