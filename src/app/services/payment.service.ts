import { Injectable } from '@angular/core';
import { PaymentCallback } from '../dto/payment-callback';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private RAZORPAY_KEY = "rzp_test_XRDXFJH73a2YFR";

  constructor(private httpClient: HttpClient) { }

  processPayment(orderId: string, amount: number): void {

    const options: any = {
      key: this.RAZORPAY_KEY,
      amount: amount * 100,
      currency: 'INR',
      name: 'VP MART',
      description: 'Ecommerce order',
      order_id: orderId,
      handler: (response: any) => {
        console.log("✅ Razorpay Payment Success:", response);
        if(response && response.razorpay_payment_id) {
          const paymentPayload ={
            razorpayOrderId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature  
          }
          console.log("✅ Razorpay Payment Success:", response);
          this.paymentCallback(paymentPayload);
        }else {
          console.error("❌ Invalid Razorpay Response:", response);
        }
      },
      prefill: {
        name: 'VP MART',
        email: 'info@vpmart.com',
        contact: '7988979'
      },
      notes: {
        addres: 'Customer Address'

      },
      theme: {
        "color": "#3399cc"
      }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();

  }

  paymentCallback(paymentCallback: PaymentCallback){
    return this.httpClient.put<PaymentCallback>(AppConstants.ORDER_ENDPOINT, paymentCallback)
    .subscribe({
      next:(response) => console.log("Payment callback success" ,response),
      error: (error) => console.log("Payment callback error", error)
    })
  }

  // confirmOrder(PaymentCallback: PaymentCallback): Observable<any> {
  //   return this.httpClient.post<Purchaseorder>(AppConstants.ORDER_ENDPOINT, PaymentCallback);
  // }

}

