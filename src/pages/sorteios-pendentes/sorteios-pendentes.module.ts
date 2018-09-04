import { IonicImageLoader } from 'ionic-image-loader';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SorteiosPendentesPage } from './sorteios-pendentes';

@NgModule({
  declarations: [
    SorteiosPendentesPage,
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(SorteiosPendentesPage),
  ],
})
export class SorteiosPendentesPageModule {}
