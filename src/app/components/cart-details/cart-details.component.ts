import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../dto/cart-item';
import { CartService } from '../../services/cart-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {

    totalPrice: number = 0;
    totalQuantity: number = 0;
    cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.listCartDetails();
  }

  constructor(private cartService: CartService) { }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    //subscribe cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //subscribe cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    //compute cart total price and quantity
    this.cartService.computeCartTotals();

  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem:CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }

  removeItem(theCartItem: CartItem){
    this.cartService.remove(theCartItem);
  }


}
