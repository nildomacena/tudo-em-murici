import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstabelecimentoInfoPage } from './estabelecimento-info';

@NgModule({
  declarations: [
    EstabelecimentoInfoPage
  ],
  imports: [
    IonicPageModule.forChild(EstabelecimentoInfoPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDo1gpDFlYJzEus8c2b3aumXH8weD7YKyM'
    }),
  ],
})
export class EstabelecimentoInfoPageModule {}
