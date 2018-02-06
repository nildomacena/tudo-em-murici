import { SuperTabsModule } from 'ionic2-super-tabs';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SorteiosPage } from './sorteios';

@NgModule({
  declarations: [
    SorteiosPage
  ],
  imports: [
    SuperTabsModule,
    IonicPageModule.forChild(SorteiosPage),
  ]
})
export class SorteiosPageModule {}
