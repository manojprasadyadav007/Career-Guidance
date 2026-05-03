import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFeeComponent } from './show-fee.component';

describe('ShowFeeComponent', () => {
  let component: ShowFeeComponent;
  let fixture: ComponentFixture<ShowFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
