import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInvoiceComponent } from './display-invoice.component';

describe('DisplayInvoiceComponent', () => {
  let component: DisplayInvoiceComponent;
  let fixture: ComponentFixture<DisplayInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
