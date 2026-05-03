import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCommissionComponent } from './show-commission.component';

describe('ShowCommissionComponent', () => {
  let component: ShowCommissionComponent;
  let fixture: ComponentFixture<ShowCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
