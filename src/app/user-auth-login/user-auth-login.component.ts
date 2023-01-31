import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddProduct, Cart, Login } from '../data-types';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth-login',
  templateUrl: './user-auth-login.component.html',
  styleUrls: ['./user-auth-login.component.css'],
})
export class UserAuthLoginComponent {
  constructor(
    private router: Router,
    private user: UserService,
    private product: ProductService
  ) {}

  isError = '';

  login(data: Login){
    this.isError = '';
    this.user.userLogin(data);
    this.user.isLoginError.subscribe((error: any) => {
      if (error) {
        this.isError = 'Enter valid email and password';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  ngOnInit(): void {
    this.user.relodeUser();
  }

  userReg() {
    this.router.navigate(['/user-auth']);
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: AddProduct[] = JSON.parse(data);

      cartDataList.forEach((product: AddProduct, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn('data is stored in DB');
            }
          });
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }
}
