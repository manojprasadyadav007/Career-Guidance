import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRefNewComponent } from './agent-ref-new.component';

describe('AgentRefNewComponent', () => {
  let component: AgentRefNewComponent;
  let fixture: ComponentFixture<AgentRefNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentRefNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentRefNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
