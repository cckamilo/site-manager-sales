import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//modules
import { MaterialModule } from './material.module';
//componentes
import { AppComponent } from './app.component';
import { FilesComponent } from './components/files/files.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ImagePreviewComponent } from './components/image-preview/image-preview.component';
import { ImageListComponent } from './components/image-list/image-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UtilsService } from './shared/services/utils.service';


@NgModule({
  declarations: [
    AppComponent,
    FilesComponent,
    ImagePreviewComponent,
    ImageListComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [

    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatStepperModule,
    BrowserAnimationsModule,   
    ReactiveFormsModule,  
    MaterialModule
   

  ],
  providers: [UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
