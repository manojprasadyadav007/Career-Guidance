import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySchoolComponent } from './display-school.component';

describe('DisplaySchoolComponent', () => {
  let component: DisplaySchoolComponent;
  let fixture: ComponentFixture<DisplaySchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
