import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusWiseApplicationCountDisplayComponent } from './status-wise-application-count-display.component';

describe('StatusWiseApplicationCountDisplayComponent', () => {
  let component: StatusWiseApplicationCountDisplayComponent;
  let fixture: ComponentFixture<StatusWiseApplicationCountDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusWiseApplicationCountDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusWiseApplicationCountDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
