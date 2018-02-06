import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentoInfoPage } from './estabelecimento-info';

@NgModule({
  declarations: [
    EstabelecimentoInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(EstabelecimentoInfoPage),
  ],
})
export class EstabelecimentoInfoPageModule {}
