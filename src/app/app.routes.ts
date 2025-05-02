import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [

    { path: "login", component: LoginComponent },
    {path: "register", component: RegisterComponent},
    { path: "reset-password", component: ResetPasswordComponent },
    {path: "forgot-password", component: ForgotPasswordComponent},
    {path: "category/:id", component: ProductListComponent},
    {path: "products", component: ProductListComponent},
    {path: "search/:keyword", component: ProductListComponent, canActivate: [AuthGuard]},
    {path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard]},
    {path: "order-confirmation", component: OrderConfirmationComponent, canActivate: [AuthGuard]},
    {path: "cart-details", component: CartDetailsComponent, canActivate: [AuthGuard]},
    {path: "", redirectTo: "/products", pathMatch: 'full'}

];
