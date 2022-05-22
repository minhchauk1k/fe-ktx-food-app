import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewOrderComponent } from './chart-view-order.component';

describe('ChartViewOrderComponent', () => {
  let component: ChartViewOrderComponent;
  let fixture: ComponentFixture<ChartViewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartViewOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
