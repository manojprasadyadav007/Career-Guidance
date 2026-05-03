import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTilesComponent } from './new-tiles.component';

describe('NewTilesComponent', () => {
  let component: NewTilesComponent;
  let fixture: ComponentFixture<NewTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
