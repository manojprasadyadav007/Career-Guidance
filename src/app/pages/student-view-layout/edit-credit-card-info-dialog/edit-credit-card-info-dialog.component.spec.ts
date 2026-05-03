import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreditCardInfoDialogComponent } from './edit-credit-card-info-dialog.component';

describe('EditCreditCardInfoDialogComponent', () => {
  let component: EditCreditCardInfoDialogComponent;
  let fixture: ComponentFixture<EditCreditCardInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCreditCardInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreditCardInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
