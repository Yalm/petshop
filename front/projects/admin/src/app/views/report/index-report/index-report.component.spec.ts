import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexReportComponent } from './index-report.component';

describe('IndexReportComponent', () => {
  let component: IndexReportComponent;
  let fixture: ComponentFixture<IndexReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
