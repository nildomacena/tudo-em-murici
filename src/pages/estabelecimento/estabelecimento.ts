import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-estabelecimento',
  templateUrl: 'estabelecimento.html',
})
export class EstabelecimentoPage {
  estabelecimento: any;
  photo: string;
  linkLocalizacao: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform
  ) {
    this.estabelecimento = this.navParams.get('estabelecimento');
    if(this.estabelecimento)
      this.estabelecimento.avatar? this.photo = this.estabelecimento.avatar : this.photo = 'http://www.guiachef.com.br/wp-content/uploads/2015/06/padaria.jpg';
    else 
      this.navCtrl.setRoot(HomePage);
    if(this.estabelecimento.localizacao.coord){
      let latLng = this.estabelecimento.localizacao.coord.lat + ','+ this.estabelecimento.localizacao.coord.lng;
      this.linkLocalizacao = this.platform.is('cordova')? 'geo:0,0?q=' + latLng + '(' + this.estabelecimento.nome + ')': "https://www.google.com.br/maps/@"+latLng +",15z?hl=pt-BR";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstabelecimentoPage');
  }

}
