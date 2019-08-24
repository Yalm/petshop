import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteInfoComponent } from './complete-info.component';

describe('CompleteInfoComponent', () => {
  let component: CompleteInfoComponent;
  let fixture: ComponentFixture<CompleteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
