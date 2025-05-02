import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CustomerDto } from '../../dto/customer-dto';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [NgIf, FormsModule, RouterModule], 
})
export class LoginComponent {
  customer: CustomerDto = new CustomerDto();
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}


  // onLogin() {
  //   this.authService.login(this.customer).subscribe({
  //     next: (response) => {
  //       console.log(response); // Debugging - check response structure
  
  //       if (response.status === 200) {
  //         const user = response.data.customer; // ✅ Extract customer details
  //         localStorage.setItem('isLoggedIn', 'true'); 
  //         localStorage.setItem('email', user.email); 
  //         localStorage.setItem('pwd_updated', user.pwdUpdated); // ✅ Correct field
  
  //         if (user.pwdUpdated === 'NO') {
  //           this.router.navigate(['/reset-password']); // ✅ Match with route path
  //         } else {
  //           this.router.navigate(['/products']); 
  //         }
  //       } else {
  //         this.errorMessage = 'Invalid credentials. Please try again.';
  //       }
  //     },
  //     error: () => {
  //       this.errorMessage = 'Invalid credentials. Please try again.';
  //     },
  //   });
  // }
  onLogin() {
    this.authService.login(this.customer).subscribe({
      next: (response) => {
        console.log(response); // Debugging - check response structure
  
        if (response.status === 200) {
          const user = response.data.customer; //  Extract customer details
          localStorage.setItem('isLoggedIn', 'true'); 
          localStorage.setItem('email', user.email); 
          localStorage.setItem('pwd_updated', user.pwdUpdated); 
  
          window.dispatchEvent(new Event('storage')); //  Notify other components
  
          if (user.pwdUpdated === 'NO') {
            this.router.navigate(['/reset-password']); //  Match with route path
          } else {
            this.router.navigate(['/products']); 
          }
        } else {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      error: () => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      },
    });
  }
  
  
  
}
