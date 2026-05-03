import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentApplicationComponent } from './add-agent-application.component';

describe('AddAgentApplicationComponent', () => {
  let component: AddAgentApplicationComponent;
  let fixture: ComponentFixture<AddAgentApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgentApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
