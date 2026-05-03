import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgramContactDialogComponent } from './show-program-contact-dialog.component';

describe('ShowProgramContactDialogComponent', () => {
  let component: ShowProgramContactDialogComponent;
  let fixture: ComponentFixture<ShowProgramContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProgramContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProgramContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
