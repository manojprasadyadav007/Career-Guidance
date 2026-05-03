import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaStatusShowComponent } from './visa-status-show.component';

describe('VisaStatusShowComponent', () => {
  let component: VisaStatusShowComponent;
  let fixture: ComponentFixture<VisaStatusShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaStatusShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaStatusShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
