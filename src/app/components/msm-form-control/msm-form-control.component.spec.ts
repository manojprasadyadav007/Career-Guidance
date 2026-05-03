import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsmFormControlComponent } from './msm-form-control.component';

describe('MsmFormControlComponent', () => {
  let component: MsmFormControlComponent;
  let fixture: ComponentFixture<MsmFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsmFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsmFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
