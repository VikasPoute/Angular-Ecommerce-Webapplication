import { Component } from '@angular/core';
import { AddProduct } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private product: ProductService) {}
  popImg: undefined | AddProduct[];
  trendyProd: undefined | AddProduct[];

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      this.popImg = data;
    });

    this.product.trendyProducts().subscribe((data) => {
      this.trendyProd = data;
    });
  }
}
