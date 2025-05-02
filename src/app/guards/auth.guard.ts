import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    console.log('AuthGuard - isLoggedIn:', isLoggedIn); // Debug log

    if (!isLoggedIn) {
      console.log('AuthGuard: User NOT logged in. Redirecting to /login...');
      this.router.navigate(['/login']);
      return false;
    }

    console.log('AuthGuard: User is logged in. Access granted.');
    return true;
  }
}
  