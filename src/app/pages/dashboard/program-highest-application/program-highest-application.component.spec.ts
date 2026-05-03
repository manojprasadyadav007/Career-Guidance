import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramHighestApplicationComponent } from './program-highest-application.component';

describe('ProgramHighestApplicationComponent', () => {
  let component: ProgramHighestApplicationComponent;
  let fixture: ComponentFixture<ProgramHighestApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramHighestApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramHighestApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
