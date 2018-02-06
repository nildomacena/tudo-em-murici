import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sorteios',
  templateUrl: 'sorteios.html',
})
export class SorteiosPage {
  pendentes = 'SorteiosPendentesPage';
  realizados = 'SorteiosRealizadosPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SorteiosPage');
  }

}
