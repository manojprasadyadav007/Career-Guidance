import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractingXlComponent } from './extracting-xl.component';

describe('ExtractingXlComponent', () => {
  let component: ExtractingXlComponent;
  let fixture: ComponentFixture<ExtractingXlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtractingXlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtractingXlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
