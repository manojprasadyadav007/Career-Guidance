import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDataUiComponent } from './import-data-ui.component';

describe('ImportDataUiComponent', () => {
  let component: ImportDataUiComponent;
  let fixture: ComponentFixture<ImportDataUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportDataUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDataUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
