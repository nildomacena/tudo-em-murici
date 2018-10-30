import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfertaDetailPage } from './oferta-detail';

@NgModule({
  declarations: [
    OfertaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(OfertaDetailPage),
  ],
})
export class OfertaDetailPageModule {}
