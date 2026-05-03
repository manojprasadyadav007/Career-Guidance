import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractedXlShowComponent } from './extracted-xl-show.component';

describe('ExtractedXlShowComponent', () => {
  let component: ExtractedXlShowComponent;
  let fixture: ComponentFixture<ExtractedXlShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractedXlShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractedXlShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
