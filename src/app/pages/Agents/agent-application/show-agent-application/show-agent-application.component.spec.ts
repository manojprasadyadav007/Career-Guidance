import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAgentApplicationComponent } from './show-agent-application.component';

describe('ShowAgentApplicationComponent', () => {
  let component: ShowAgentApplicationComponent;
  let fixture: ComponentFixture<ShowAgentApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAgentApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAgentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
