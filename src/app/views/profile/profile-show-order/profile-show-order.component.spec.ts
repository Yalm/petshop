import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileShowOrderComponent } from './profile-show-order.component';

describe('ProfileShowOrderComponent', () => {
  let component: ProfileShowOrderComponent;
  let fixture: ComponentFixture<ProfileShowOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileShowOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileShowOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
