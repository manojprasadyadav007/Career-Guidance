import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentsDetailedComponent } from './show-students-detailed.component';

describe('ShowStudentsDetailedComponent', () => {
  let component: ShowStudentsDetailedComponent;
  let fixture: ComponentFixture<ShowStudentsDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStudentsDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentsDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
