import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewSalesComponent } from './chart-view-sales.component';

describe('ChartViewSalesComponent', () => {
  let component: ChartViewSalesComponent;
  let fixture: ComponentFixture<ChartViewSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartViewSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartViewSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
