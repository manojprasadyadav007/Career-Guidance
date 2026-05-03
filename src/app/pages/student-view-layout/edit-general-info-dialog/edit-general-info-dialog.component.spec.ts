import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneralInfoDialogComponent } from './edit-general-info-dialog.component';

describe('EditGeneralInfoDialogComponent', () => {
  let component: EditGeneralInfoDialogComponent;
  let fixture: ComponentFixture<EditGeneralInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGeneralInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGeneralInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
