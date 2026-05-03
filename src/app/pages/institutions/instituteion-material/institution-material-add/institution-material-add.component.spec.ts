import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionMaterialAddComponent } from './institution-material-add.component';

describe('InstitutionMaterialAddComponent', () => {
  let component: InstitutionMaterialAddComponent;
  let fixture: ComponentFixture<InstitutionMaterialAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionMaterialAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionMaterialAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
