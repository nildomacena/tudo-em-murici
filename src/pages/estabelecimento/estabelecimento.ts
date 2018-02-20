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
    console.log(this.estabelecimento);
    if(this.estabelecimento){
      this.estabelecimento.avatar? this.photo = this.estabelecimento.avatar : this.photo = 'http://www.guiachef.com.br/wp-content/uploads/2015/06/padaria.jpg';
      if(this.estabelecimento.coords){
        let latLng = this.estabelecimento.coords.lat + ','+ this.estabelecimento.coords.lng;
        this.linkLocalizacao = this.platform.is('cordova')? 'geo:0,0?q=' + latLng + '(' + this.estabelecimento.nome + ')': "https://www.google.com.br/maps/@"+latLng +",15z?hl=pt-BR";
      }
    }
    else{
      this.estabelecimento = {
        key: "0",
        categoria: "0",
        avatar:"https://d1jgln4w9al398.cloudfront.net/imagens/ce/logosgde/logomarca%20mar_mario_rger01.jpg",
        coords: {
          lat: -9.5725635,
          lng: -35.7243071
        },
        logradouro: "Avenida Central, 45",
        nome: "Marios Burgers",
        telefone: "9999-8888",
        telefonePrimario: "99874-5631",
        telefoneSecundario: "3324-5458"
      }
      console.log('nao tem estabelecimento')
      //this.navCtrl.setRoot(HomePage);
    }
    this.photo = this.estabelecimento.avatar
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstabelecimentoPage');
  }

  verMais(){
    this.navCtrl.push('EstabelecimentoInfoPage',{estabelecimento: this.estabelecimento})
  }

}
