import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDocumentsLocalComponent } from './display-documents-local.component';

describe('DisplayDocumentsLocalComponent', () => {
  let component: DisplayDocumentsLocalComponent;
  let fixture: ComponentFixture<DisplayDocumentsLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDocumentsLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDocumentsLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
