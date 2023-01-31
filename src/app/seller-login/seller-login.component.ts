import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../data-types';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css'],
})
export class SellerLoginComponent {
  constructor(private seller: SellerService, private router: Router) {}

  isError = '';

  login(data: Login): void {
    this.isError = '';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((error) => {
      if (error) {
        this.isError = 'Enter valid email and password';
      }
    });
  }

  ngOnInit(): void {
    this.seller.relodeSeller();
  }

  sellerReg() {
    this.router.navigate(['seller-auth']);
  }
}
