import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRefundComponent } from './show-refund.component';

describe('ShowRefundComponent', () => {
  let component: ShowRefundComponent;
  let fixture: ComponentFixture<ShowRefundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRefundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
