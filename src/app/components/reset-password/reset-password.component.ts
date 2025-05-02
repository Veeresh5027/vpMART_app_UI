import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ResetPasswordRequestDTO } from '../../dto/reset-password-request-dto';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ResetPasswordComponent {
  resetRequest: ResetPasswordRequestDTO = {
    email: localStorage.getItem('email') || '',
    oldPwd: '',
    newPwd: '',
    confirmPwd: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onResetPassword(): void {
    if (this.resetRequest.newPwd !== this.resetRequest.confirmPwd) {
      this.errorMessage = 'New password and confirm password must match.';
      return;
    }

    this.authService.resetPassword(this.resetRequest).subscribe({
      next: () => {
        localStorage.setItem('pwd_updated', 'YES'); // Mark password as updated
        alert('Password reset successful. Redirecting to login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Password reset failed. Try again.';
        console.error(err);
      }
    });
  }
}
