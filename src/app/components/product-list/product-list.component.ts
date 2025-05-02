import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../dto/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from '../../dto/cart-item';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number | undefined; 
  searchMode: boolean = false;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts(): void {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1; // Default category
    }

    this.productService.getProductsByCategoryId(this.currentCategoryId!).subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get("keyword")!;
    this.productService.searchProducts(theKeyword).subscribe(res => {
      this.products = res.data;
    });
  }

  // addToCart(theProduct: Product) {
  //   console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
  //   const cartItem = new CartItem(theProduct);
  //   this.cartService.addToCart(cartItem);
  // }
  addToCart(theProduct: Product) {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login status

    if (!isLoggedIn) {
      alert("You need to login first!");
      this.router.navigate(['/login']); // Redirect to login page
      return;
    }

    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    const cartItem = new CartItem(theProduct);
    this.cartService.addToCart(cartItem);
  } 
}
