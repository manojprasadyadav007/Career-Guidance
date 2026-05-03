import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFilesLocalComponent } from './display-files-local.component';

describe('DisplayDocumentsLocalComponent', () => {
  let component: DisplayFilesLocalComponent;
  let fixture: ComponentFixture<DisplayFilesLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayFilesLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFilesLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
