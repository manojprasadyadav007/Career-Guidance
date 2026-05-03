import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramFilterDisplayComponent } from './program-filter-display.component';

describe('ProgramFilterDisplayComponent', () => {
  let component: ProgramFilterDisplayComponent;
  let fixture: ComponentFixture<ProgramFilterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramFilterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFilterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
