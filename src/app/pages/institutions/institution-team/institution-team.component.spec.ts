import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionTeamComponent } from './institution-team.component';

describe('InstitutionTeamComponent', () => {
  let component: InstitutionTeamComponent;
  let fixture: ComponentFixture<InstitutionTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
