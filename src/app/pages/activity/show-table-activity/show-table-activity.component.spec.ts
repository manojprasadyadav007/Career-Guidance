import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTableActivityComponent } from './show-table-activity.component';

describe('ShowTableActivityComponent', () => {
  let component: ShowTableActivityComponent;
  let fixture: ComponentFixture<ShowTableActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTableActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTableActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
