import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes:
  Routes = [{
    path: '',
    component: AdminComponent
  },
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
