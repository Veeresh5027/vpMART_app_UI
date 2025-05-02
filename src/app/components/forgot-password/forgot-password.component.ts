import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        if (response.status === 200) {
          this.message = 'An email has been sent to reset your password.';
        } else {
          this.message = 'No account found with this email.';
        }
      },
      (error) => {
        this.message = 'An error occurred. Please try again.';
      }
    );
  }
}
