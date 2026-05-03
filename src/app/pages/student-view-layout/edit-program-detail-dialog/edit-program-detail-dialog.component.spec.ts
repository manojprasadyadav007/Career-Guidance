import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramDetailDialogComponent } from './edit-program-detail-dialog.component';

describe('EditProgramDetailDialogComponent', () => {
  let component: EditProgramDetailDialogComponent;
  let fixture: ComponentFixture<EditProgramDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProgramDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgramDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
