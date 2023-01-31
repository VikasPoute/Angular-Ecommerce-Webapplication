import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResetForm, AddProduct } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  clearForm: ResetForm = new ResetForm();
  constructor(private product: ProductService) {}
  addProducts(data: AddProduct) {
    this.product.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = 'Product Added Successfully';
      }
      setTimeout(() => (this.addProductMessage = undefined), 2000);
      setTimeout(() => {
        this.clearForm.name = '';
        this.clearForm.price = undefined;
        this.clearForm.color = '';
        this.clearForm.category = '';
        this.clearForm.image = '';
        this.clearForm.decription = '';
      }, 2000);
    });
  }
}
