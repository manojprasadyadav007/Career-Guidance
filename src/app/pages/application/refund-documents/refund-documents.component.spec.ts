import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundDocumentsComponent } from './refund-documents.component';

describe('RefundDocumentsComponent', () => {
  let component: RefundDocumentsComponent;
  let fixture: ComponentFixture<RefundDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
