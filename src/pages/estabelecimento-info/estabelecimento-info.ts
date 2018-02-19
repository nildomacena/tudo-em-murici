import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';
import { AgmMap } from '@agm/core';
import {} from '@types/googlemaps';
declare var google: any

@IonicPage()
@Component({
  selector: 'page-estabelecimento-info',
  templateUrl: 'estabelecimento-info.html',
})
export class EstabelecimentoInfoPage {
  estabelecimento: any;
  lat: number = -9.3133077;
  lng: number = -35.942441;
  latMarker: number = -9.3133077;
  lngMarker: number = -35.942441;
  image;
  linkLocalizacao: string = '';
  @ViewChild('agmMap') agmMap : AgmMap
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform
  ) {
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
    
    if(this.platform.is('cordova') == true){
      this.linkLocalizacao = `geo:0,0?q=${this.latMarker},${this.lngMarker}(${this.estabelecimento.nome})`
    }

    else{
      this.linkLocalizacao = `https://www.google.com.br/maps/@${this.latMarker},${this.lngMarker},17.25z?hl=pt-BR`  
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstabelecimentoInfoPage');
  }

  clickMarker(){
    console.log('click marker');
    window.open(this.linkLocalizacao);
  }

}
