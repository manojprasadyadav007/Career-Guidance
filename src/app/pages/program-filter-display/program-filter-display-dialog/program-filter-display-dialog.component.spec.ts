import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramFilterDisplayDialogComponent } from './program-filter-display-dialog.component';

describe('ProgramFilterDisplayDialogComponent', () => {
  let component: ProgramFilterDisplayDialogComponent;
  let fixture: ComponentFixture<ProgramFilterDisplayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramFilterDisplayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFilterDisplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
