import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XlBatchdataDialogComponent } from './xl-batchdata-dialog.component';

describe('XlBatchdataDialogComponent', () => {
  let component: XlBatchdataDialogComponent;
  let fixture: ComponentFixture<XlBatchdataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XlBatchdataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XlBatchdataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
