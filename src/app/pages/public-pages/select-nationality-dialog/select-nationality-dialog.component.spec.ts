import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectNationalityDialogComponent } from './select-nationality-dialog.component';

describe('SelectNationalityDialogComponent', () => {
  let component: SelectNationalityDialogComponent;
  let fixture: ComponentFixture<SelectNationalityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectNationalityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectNationalityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
