import { Component } from '@angular/core';
import { AddProduct } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent {
  productList: undefined | AddProduct[];
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.products();
  }

  products() {
    this.product.productList().subscribe((result) => {
      this.productList = result;
    });
  }

  productDelete(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        alert('Product Deleted Sucessfully....');
        this.products();
      }
    });
  }
}
