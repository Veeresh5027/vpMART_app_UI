import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterRequestDTO } from '../../dto/register-request-dto';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule], 
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerRequest: RegisterRequestDTO = {
    name: '',
    email: '',
    phoneNo: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.authService.register(this.registerRequest).subscribe({
      next: () => {
        alert('Registration successful! Redirecting to login.');
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Try again.';
        console.error(err);
      }
    });
  }
}
