import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { MyOrdersComponent} from './components/my-orders/my-orders.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'myorders', component: MyOrdersComponent},
  { path: 'cart', component: CartComponent},  
  { path: '', redirectTo: '/myorders', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
