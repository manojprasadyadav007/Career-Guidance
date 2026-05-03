import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionProgramStatusUpdateComponent } from './institution-program-status-update.component';

describe('InstitutionProgramStatusUpdateComponent', () => {
  let component: InstitutionProgramStatusUpdateComponent;
  let fixture: ComponentFixture<InstitutionProgramStatusUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionProgramStatusUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionProgramStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
