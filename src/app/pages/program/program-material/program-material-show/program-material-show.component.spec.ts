import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMaterialShowComponent } from './program-material-show.component';

describe('ProgramMaterialShowComponent', () => {
  let component: ProgramMaterialShowComponent;
  let fixture: ComponentFixture<ProgramMaterialShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramMaterialShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMaterialShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
