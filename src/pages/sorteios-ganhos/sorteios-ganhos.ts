import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sorteios-ganhos',
  templateUrl: 'sorteios-ganhos.html',
})
export class SorteiosGanhosPage {
  sorteios: any[] = [];
  carregado: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fire: FireProvider, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({ content: 'Carregando...' });
    loading.present();
    setTimeout(() => {
      this.fire.getSorteiosGanhos()
        .then(sorteios => {
          console.log(sorteios);
          this.sorteios = sorteios;
          loading.dismiss();
        })
    }, 700);
  }

}
