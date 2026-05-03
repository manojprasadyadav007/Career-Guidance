import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionIntakeComponent } from './institution-intake.component';

describe('InstitutionIntakeComponent', () => {
  let component: InstitutionIntakeComponent;
  let fixture: ComponentFixture<InstitutionIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
