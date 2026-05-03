import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInstitutionMaterialDialogComponent } from './show-institution-material-dialog.component';

describe('ShowInstitutionMaterialDialogComponent', () => {
  let component: ShowInstitutionMaterialDialogComponent;
  let fixture: ComponentFixture<ShowInstitutionMaterialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInstitutionMaterialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInstitutionMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
