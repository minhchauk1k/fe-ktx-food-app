import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewProductComponent } from './chart-view-product.component';

describe('ChartViewProductComponent', () => {
  let component: ChartViewProductComponent;
  let fixture: ComponentFixture<ChartViewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartViewProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
