import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart-service.service';
import { CheckoutServiceService } from '../../services/checkout-service.service';
import { Order } from '../../dto/order';
import { Orderitems } from '../../dto/orderitems';
import { Purchaseorder } from '../../dto/purchaseorder';
import { PaymentService } from '../../services/payment.service';
import { PaymentCallback } from '../../dto/payment-callback';

@Component({
  selector: 'app-checkout',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  razorpayOrderId: string = "";

  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutServiceService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.reviewCartDetails()

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: [''],
        email: [''],
        phoneNo: ['']
      }),

      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        houseNum: [''],
        zipCode: ['']
      }),
    })

  }

  get getName() { return this.checkoutFormGroup.get('customer.name'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get phno() { return this.checkoutFormGroup.get('customer.phno'); }

get addressStreet() { return this.checkoutFormGroup.get('address.street'); }
  get addressCity() { return this.checkoutFormGroup.get('address.city'); }
  get adressState() { return this.checkoutFormGroup.get('address.state'); }
  get addressZipCode() { return this.checkoutFormGroup.get('address.zipCode'); }
  get addressHouseNum() { return this.checkoutFormGroup.get('address.houseNum'); }

  onSubmit() {

    // setup order
    let order = new Order(this.totalQuantity, this.totalPrice);


    // setup order items
    const cartItems = this.cartService.cartItems;
    let orderItems: Orderitems[] = cartItems.map(tempCartItem => new Orderitems(tempCartItem.imageUrl!, tempCartItem.unitPrice!, tempCartItem.quantity, tempCartItem.id!));


    // setup purchase  order
    let purchase = new Purchaseorder();

    // set customer data to purchase order
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // set address data to purchase order
    purchase.address = this.checkoutFormGroup.controls['address'].value;

    // set order
    purchase.order = order;

    // set order items 
    purchase.orderItems = orderItems;

    // make backend api call

    this.checkoutService.placeOrder(purchase).subscribe(response => {
      const responseData = response.data;
      console.log("component response :" + JSON.stringify(response));
      this.razorpayOrderId = responseData.razorpayOrderId;
      this.paymentService.processPayment(responseData.razorpayOrderId, this.totalPrice);
      this.cartService.clearCart();
      this.router.navigateByUrl('/order-confirmation');
    })
  }
   

  reviewCartDetails() {

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
}
