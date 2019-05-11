import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QtyComponent } from './qty.component';

describe('QtyComponent', () => {
  let component: QtyComponent;
  let fixture: ComponentFixture<QtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
