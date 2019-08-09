import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCustomerComponent } from './top-customer.component';

describe('TopCustomerComponent', () => {
  let component: TopCustomerComponent;
  let fixture: ComponentFixture<TopCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
