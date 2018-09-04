import { IonicImageLoader } from 'ionic-image-loader';
import { ElasticHeaderDirective } from './../../directives/elastic-header/elastic-header';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentoPage } from './estabelecimento';

@NgModule({
  declarations: [
    EstabelecimentoPage,
    ElasticHeaderDirective
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(EstabelecimentoPage),
  ],
})
export class EstabelecimentoPageModule {}
