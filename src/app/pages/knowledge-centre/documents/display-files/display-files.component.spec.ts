import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFilesComponent } from './display-files.component';

describe('DisplayDocumentsComponent', () => {
  let component: DisplayFilesComponent;
  let fixture: ComponentFixture<DisplayFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
