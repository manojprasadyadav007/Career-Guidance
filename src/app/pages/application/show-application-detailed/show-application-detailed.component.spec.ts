import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowApplicationDetailedComponent } from './show-application-detailed.component';

describe('ShowApplicationDetailedComponent', () => {
  let component: ShowApplicationDetailedComponent;
  let fixture: ComponentFixture<ShowApplicationDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowApplicationDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowApplicationDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
