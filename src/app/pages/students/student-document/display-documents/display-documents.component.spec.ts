import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDocumentsComponent } from './display-documents.component';

describe('DisplayDocumentsComponent', () => {
  let component: DisplayDocumentsComponent;
  let fixture: ComponentFixture<DisplayDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
