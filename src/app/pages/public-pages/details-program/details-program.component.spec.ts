import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProgramComponent } from './details-program.component';

describe('DetailsProgramComponent', () => {
  let component: DetailsProgramComponent;
  let fixture: ComponentFixture<DetailsProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
