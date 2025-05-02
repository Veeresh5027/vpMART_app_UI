import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterOutlet, ProductCategoryMenuComponent, SearchComponent, CartStatusComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ecommerce_ui';
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();

    // Listen for login/logout changes
    window.addEventListener('storage', this.syncLoginStatus);
  }

  ngOnDestroy() {
    // Cleanup listener when component is destroyed
    window.removeEventListener('storage', this.syncLoginStatus);
  }

  checkLoginStatus() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  syncLoginStatus = () => {
    this.checkLoginStatus();
  };

  onLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('pwd_updated');

    window.dispatchEvent(new Event('storage')); // Notify other components
    this.isLoggedIn = false;

    this.isLoggedIn = false;
    this.router.navigate(['/products']);
  }
}
