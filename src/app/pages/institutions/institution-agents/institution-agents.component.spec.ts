import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAgentsComponent } from './institution-agents.component';

describe('InstitutionAgentsComponent', () => {
  let component: InstitutionAgentsComponent;
  let fixture: ComponentFixture<InstitutionAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
