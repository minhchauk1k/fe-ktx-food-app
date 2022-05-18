import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuCartComponent } from './product-menu-cart.component';

describe('ProductMenuCartComponent', () => {
  let component: ProductMenuCartComponent;
  let fixture: ComponentFixture<ProductMenuCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMenuCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMenuCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
