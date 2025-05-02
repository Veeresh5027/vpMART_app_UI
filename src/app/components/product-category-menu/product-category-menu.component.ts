import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../../dto/product-category';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService) {
    
   }

   ngOnInit(): void {
     this.listProductCategories();
   }

  //  listProductCategories(){
  //    this.productService.getAllCategories().subscribe(response => {
  //      this.productCategories = response.data;
  //    });
  //  }

  listProductCategories() {
    this.productService.getAllCategories().subscribe(response => {
      console.log("API Response:", response); // Log entire response
      if (response && response.data) {
        this.productCategories = response.data;
        console.log("Product Categories:", this.productCategories); // Check the actual array
      } else {
        console.log("No Categories Found or API Error");
      }
    }, error => {
      console.error("API Error:", error);
    });
  }
  

}
