import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeComponent } from './attende.component';

describe('AttendeComponent', () => {
  let component: AttendeComponent;
  let fixture: ComponentFixture<AttendeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
