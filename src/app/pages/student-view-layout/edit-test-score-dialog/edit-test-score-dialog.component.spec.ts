import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestScoreDialogComponent } from './edit-test-score-dialog.component';

describe('EditTestScoreDialogComponent', () => {
  let component: EditTestScoreDialogComponent;
  let fixture: ComponentFixture<EditTestScoreDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestScoreDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestScoreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
