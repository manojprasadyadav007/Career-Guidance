import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInvoiceCommissionComponent } from './map-invoice-commission.component';

describe('MapInvoiceCommissionComponent', () => {
  let component: MapInvoiceCommissionComponent;
  let fixture: ComponentFixture<MapInvoiceCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapInvoiceCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapInvoiceCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
