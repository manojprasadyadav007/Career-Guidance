import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFeeAddComponent } from './application-fee-add.component';

describe('ApplicationFeeAddComponent', () => {
  let component: ApplicationFeeAddComponent;
  let fixture: ComponentFixture<ApplicationFeeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationFeeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFeeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
