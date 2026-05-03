import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionMaterialShowComponent } from './institution-material-show.component';

describe('InstitutionMaterialShowComponent', () => {
  let component: InstitutionMaterialShowComponent;
  let fixture: ComponentFixture<InstitutionMaterialShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionMaterialShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionMaterialShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
