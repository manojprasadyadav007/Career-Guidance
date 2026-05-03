import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthYearPickerNewComponent } from './month-year-picker-new.component';

describe('MonthYearPickerNewComponent', () => {
  let component: MonthYearPickerNewComponent;
  let fixture: ComponentFixture<MonthYearPickerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthYearPickerNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthYearPickerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
