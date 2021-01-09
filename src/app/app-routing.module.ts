import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageListComponent } from './components/image-list/image-list.component';
import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { FilesComponent } from './components/files/files.component';

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
    redirectTo: '/image-list',
    pathMatch: 'full'
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
