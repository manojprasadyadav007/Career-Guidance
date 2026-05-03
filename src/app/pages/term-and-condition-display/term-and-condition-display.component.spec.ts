import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermAndConditionDisplayComponent } from './term-and-condition-display.component';

describe('TermAndConditionDisplayComponent', () => {
  let component: TermAndConditionDisplayComponent;
  let fixture: ComponentFixture<TermAndConditionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermAndConditionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermAndConditionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
