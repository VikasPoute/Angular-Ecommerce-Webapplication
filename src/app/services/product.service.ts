import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AddProduct, Cart, order } from '../data-types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<AddProduct[] | []>();
  constructor(private http: HttpClient) { }
  addProduct(data: AddProduct) {
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<AddProduct[]>('http://localhost:3000/products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<AddProduct>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: AddProduct) {
    return this.http.put<AddProduct>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  popularProducts() {
    return this.http.get<AddProduct[]>(
      'http://localhost:3000/products?_limit=3'
    );
  }

  trendyProducts() {
    return this.http.get<AddProduct[]>(
      'http://localhost:3000/products?_limit=8'
    );
  }

  searchProduct(query: string) {
    return this.http.get<AddProduct[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddToCart(data: AddProduct) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: AddProduct[] = JSON.parse(cartData);
      items = items.filter((item: AddProduct) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<AddProduct[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(
      'http://localhost:3000/cart?userId=' + userData.id
    );
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>(
      'http://localhost:3000/orders?userId=' + userData.id
    );
  }

  deleteCartItems(cartId: number) {
    return this.http
      .delete('http://localhost:3000/cart/' + cartId)
      .subscribe((result) => {
        this.cartData.emit([]);
      });
  }

  cancelOrder(orderId: number) {
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }
}
