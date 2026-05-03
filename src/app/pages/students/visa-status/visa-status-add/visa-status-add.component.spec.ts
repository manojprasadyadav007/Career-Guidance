import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaStatusAddComponent } from './visa-status-add.component';

describe('VisaStatusAddComponent', () => {
  let component: VisaStatusAddComponent;
  let fixture: ComponentFixture<VisaStatusAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaStatusAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaStatusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
