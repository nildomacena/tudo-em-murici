import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-ofertas',
  templateUrl: 'ofertas.html',
})
export class OfertasPage {
  ofertas: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ofertas = this.navParams.get('ofertas');
    if(!this.navParams.get('ofertas'))
      this.navCtrl.setRoot(HomePage);
    console.log(this.ofertas);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfertasPage');
  }

  goToOferta(oferta){
    this.navCtrl.push('OfertaDetailPage',{oferta: oferta});
  }
}
