import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramUpdatesComponent } from './program-updates.component';

describe('ProgramUpdatesComponent', () => {
  let component: ProgramUpdatesComponent;
  let fixture: ComponentFixture<ProgramUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
