import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SorteioDetailPage } from './sorteio-detail';

@NgModule({
  declarations: [
    SorteioDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SorteioDetailPage),
  ],
})
export class SorteioDetailPageModule {}
