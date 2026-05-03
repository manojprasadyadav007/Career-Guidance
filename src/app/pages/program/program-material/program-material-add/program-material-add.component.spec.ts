import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMaterialAddComponent } from './program-material-add.component';

describe('ProgramMaterialAddComponent', () => {
  let component: ProgramMaterialAddComponent;
  let fixture: ComponentFixture<ProgramMaterialAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramMaterialAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMaterialAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
