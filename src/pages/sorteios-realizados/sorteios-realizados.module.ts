import { IonicImageLoader } from 'ionic-image-loader';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SorteiosRealizadosPage } from './sorteios-realizados';

@NgModule({
  declarations: [
    SorteiosRealizadosPage,
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(SorteiosRealizadosPage),
  ],
})
export class SorteiosRealizadosPageModule {}
