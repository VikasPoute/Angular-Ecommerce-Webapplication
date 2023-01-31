import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from '../data-types';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private router: Router) {}

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  ngOnInit(): void {
    this.seller.relodeSeller();
  }

  sellerLogin() {
    this.router.navigate(['seller-login']);
  }
}
