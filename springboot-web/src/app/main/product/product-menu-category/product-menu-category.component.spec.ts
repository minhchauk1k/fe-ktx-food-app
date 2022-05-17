import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuCategoryComponent } from './product-menu-category.component';

describe('ProductMenuCategoryComponent', () => {
  let component: ProductMenuCategoryComponent;
  let fixture: ComponentFixture<ProductMenuCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMenuCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMenuCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
