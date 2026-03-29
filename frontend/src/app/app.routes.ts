import { Routes } from '@angular/router';
import { ProductDetails } from './features/products/components/product-details/product-details';
import { NotFound } from './shared/components/not-found/not-found';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { ProductsLocal } from './features/products/components/products-local/products-local';
import { Home } from './features/home/home/home';
import { Cart } from './features/user/components/cart/cart';
import { adminGuard } from './core/guards/admin-guard';
import { UserLayout } from './shared/components/user-layout/user-layout';

export const routes: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      { path: '', component: Home },
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
    ],
  },
  {
    path: 'admin',
    // canActivate: [adminGuard],
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },
  {
    path: '**',
    component: NotFound,
  },
];
