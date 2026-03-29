import { Routes } from '@angular/router';
import { AdminLayout } from './layout/admin-layout';
import { Dashboard } from './dashboard/dashboard';
import { ProductList } from './manage-products/components/product-list/product-list';
import { ProductForm } from './manage-products/components/product-form/product-form';
import { OrderList } from './manage-orders/components/order-list/order-list';
import { UserList } from './manage-users/components/user-list/user-list';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: ProductList },
      { path: 'products/add', component: ProductForm },
      { path: 'products/:id/edit', component: ProductForm },
      { path: 'orders', component: OrderList },
      { path: 'users', component: UserList },
    ],
  },
];
