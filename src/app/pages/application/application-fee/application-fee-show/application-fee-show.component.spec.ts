import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFeeShowComponent } from './application-fee-show.component';

describe('ApplicationFeeShowComponent', () => {
  let component: ApplicationFeeShowComponent;
  let fixture: ComponentFixture<ApplicationFeeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationFeeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFeeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
