import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-estabelecimento-info',
  templateUrl: 'estabelecimento-info.html',
})
export class EstabelecimentoInfoPage {
  estabelecimento: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.estabelecimento = this.navParams.get('estabelecimento');    // fase de testes

    this.estabelecimento = {
      key: "0",
      categoria: "0",
      avatar:"https://d1jgln4w9al398.cloudfront.net/imagens/ce/logosgde/logomarca%20mar_mario_rger01.jpg",
      localizacao: {
        coord: {
          lat: -9.5725635,
          lng: -35.7243071
        },
        logradouro: "Avenida Central, 45"
      },
      nome: "Marios Burgers",
      telefone: "9999-8888",
      telefonePrimario: "99874-5631",
      telefoneSecundario: "3324-5458"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstabelecimentoInfoPage');
  }

}
