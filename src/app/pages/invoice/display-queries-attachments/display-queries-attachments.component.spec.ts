import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQueriesAttachmentsComponent } from './display-queries-attachments.component';

describe('DisplayQueriesAttachmentsComponent', () => {
  let component: DisplayQueriesAttachmentsComponent;
  let fixture: ComponentFixture<DisplayQueriesAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayQueriesAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayQueriesAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
