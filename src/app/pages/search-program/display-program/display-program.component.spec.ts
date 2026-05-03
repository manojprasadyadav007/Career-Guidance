import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProgramComponent } from './display-program.component';

describe('DisplayProgramComponent', () => {
  let component: DisplayProgramComponent;
  let fixture: ComponentFixture<DisplayProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
