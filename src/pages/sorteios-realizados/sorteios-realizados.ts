import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sorteios-realizados',
  templateUrl: 'sorteios-realizados.html',
})
export class SorteiosRealizadosPage {
  sorteios: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public fire:FireProvider ) {
    this.fire.getSorteiosRealizados()
      .then(sorteios => {
        this.sorteios = sorteios;
        this.sorteios = this.sorteios.sort((a,b) => {
          return a.data - b.data;
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SorteiosRealizadosPage');
  }

}
