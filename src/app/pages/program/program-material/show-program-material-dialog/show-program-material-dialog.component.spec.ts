import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProgramMaterialDialogComponent } from './show-program-material-dialog.component';

describe('ShowProgramMaterialDialogComponent', () => {
  let component: ShowProgramMaterialDialogComponent;
  let fixture: ComponentFixture<ShowProgramMaterialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProgramMaterialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProgramMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
