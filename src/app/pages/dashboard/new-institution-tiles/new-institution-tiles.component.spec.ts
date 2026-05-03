import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstitutionTilesComponent } from './new-institution-tiles.component';

describe('NewInstitutionTilesComponent', () => {
  let component: NewInstitutionTilesComponent;
  let fixture: ComponentFixture<NewInstitutionTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInstitutionTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstitutionTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
