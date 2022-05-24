import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeliveryLotComponent } from './order-delivery-lot.component';

describe('OrderDeliveryLotComponent', () => {
  let component: OrderDeliveryLotComponent;
  let fixture: ComponentFixture<OrderDeliveryLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDeliveryLotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDeliveryLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
