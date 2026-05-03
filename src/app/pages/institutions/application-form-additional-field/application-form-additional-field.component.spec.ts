import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormAdditionalFieldComponent } from './application-form-additional-field.component';

describe('ApplicationFormAdditionalFieldComponent', () => {
  let component: ApplicationFormAdditionalFieldComponent;
  let fixture: ComponentFixture<ApplicationFormAdditionalFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationFormAdditionalFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationFormAdditionalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
