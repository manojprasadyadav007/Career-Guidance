import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionMaterialShowFilesComponent } from './institution-material-show-files.component';

describe('InstitutionMaterialShowFilesComponent', () => {
  let component: InstitutionMaterialShowFilesComponent;
  let fixture: ComponentFixture<InstitutionMaterialShowFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionMaterialShowFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionMaterialShowFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
