import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTearmAndConditionsComponent } from './view-tearm-and-conditions.component';

describe('ViewTearmAndConditionsComponent', () => {
  let component: ViewTearmAndConditionsComponent;
  let fixture: ComponentFixture<ViewTearmAndConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTearmAndConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTearmAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
