import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SorteiosGanhosPage } from './sorteios-ganhos';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    SorteiosGanhosPage,
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(SorteiosGanhosPage),
  ],
})
export class SorteiosGanhosPageModule {}
