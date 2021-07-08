import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { FilesComponent } from './components/files/files.component';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [
  {
    path: 'image-list',
    component: ImageListComponent
  },
  {
    path:'file/new',
    component: FilesComponent
  },
  {
    path: 'image/:id',
    component: ImagePreviewComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'notFound', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'admin', 
  loadChildren: () => 
  import('./pages/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', 
  loadChildren: () => 
  import('./pages/auth/login/login.module').then(m => m.LoginModule),
  canActivate: [CheckLoginGuard]
 }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
