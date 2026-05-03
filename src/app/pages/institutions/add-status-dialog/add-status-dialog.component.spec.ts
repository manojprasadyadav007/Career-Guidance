import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStatusDialogComponent } from './add-status-dialog.component';

describe('AddStatusDialogComponent', () => {
  let component: AddStatusDialogComponent;
  let fixture: ComponentFixture<AddStatusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStatusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
