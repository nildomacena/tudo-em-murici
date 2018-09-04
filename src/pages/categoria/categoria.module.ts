import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaPage } from './categoria';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    CategoriaPage,
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(CategoriaPage),
  ],
})
export class CategoriaPageModule {}
