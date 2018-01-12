import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-estabelecimento',
  templateUrl: 'estabelecimento.html',
})
export class EstabelecimentoPage {
  estabelecimento: any;
  photo: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.estabelecimento = this.navParams.get('estabelecimento');
    this.estabelecimento? '': this.navCtrl.setRoot(HomePage);
    this.estabelecimento.avatar? this.photo = this.estabelecimento.avatar : this.photo = 'http://www.guiachef.com.br/wp-content/uploads/2015/06/padaria.jpg';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstabelecimentoPage');
  }

}
