import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagementLotComponent } from './order-management-lot.component';

describe('OrderManagementLotComponent', () => {
  let component: OrderManagementLotComponent;
  let fixture: ComponentFixture<OrderManagementLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderManagementLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagementLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
