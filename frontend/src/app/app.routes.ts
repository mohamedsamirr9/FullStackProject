import { Routes } from '@angular/router';
import { ProductDetails } from './components/product-details/product-details';
import { NotFound } from './pages/not-found/not-found';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { authGuard } from './guards/auth-guard';
import { ProductsLocal } from './components/products-local/products-local';
import { Home } from './components/home/home';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'products/:page/:pageSize',
    component: ProductsLocal,
  },
  {
    path: 'products/category/:id/:name/:page/:pageSize',
    component: ProductsLocal,
  },
  {
    path: 'products/:searchTerm/:page/:pageSize',
    component: ProductsLocal,
  },
  {
    path: 'products/:id',
    component: ProductDetails,
  },
  {
    path: 'cart',
    component: Cart,
  },
  { path: 'register', component: Register, canActivate: [authGuard] },
  { path: 'login', component: Login, canActivate: [authGuard] },

  {
    path: '**',
    component: NotFound,
  },
];
