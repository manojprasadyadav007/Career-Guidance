import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRefundDocumentsComponent } from './view-refund-documents.component';

describe('ViewRefundDocumentsComponent', () => {
  let component: ViewRefundDocumentsComponent;
  let fixture: ComponentFixture<ViewRefundDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRefundDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRefundDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
