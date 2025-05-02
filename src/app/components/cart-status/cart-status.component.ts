import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
import { CartItem } from '../../dto/cart-item';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit{

  totalPrice: number = 0;
  totalQuantity: number = 0;
  cartItems: CartItem[] = [];
  showCartDetails: boolean = false;

  private router = inject(Router);

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus(){
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  isLoginPage(): boolean {
    return this.router.url === '/login'; // Hide cart if on login page
  }
  
  isLoggedIn(): boolean {
    return localStorage.getItem("isLoggedIn") === "true"; // Check login status
  }


}
