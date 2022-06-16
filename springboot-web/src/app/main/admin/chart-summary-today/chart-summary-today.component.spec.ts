import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSummaryTodayComponent } from './chart-summary-today.component';

describe('ChartSummaryTodayComponent', () => {
  let component: ChartSummaryTodayComponent;
  let fixture: ComponentFixture<ChartSummaryTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSummaryTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSummaryTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
