import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sorteios-realizados',
  templateUrl: 'sorteios-realizados.html',
})
export class SorteiosRealizadosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SorteiosRealizadosPage');
  }

}
