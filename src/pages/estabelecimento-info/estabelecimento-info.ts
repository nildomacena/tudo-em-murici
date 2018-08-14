import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams, AlertController } from 'ionic-angular';
import { AgmMap } from '@agm/core';
import {} from '@types/google-maps';
import { CallNumber } from '@ionic-native/call-number';
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
    public platform: Platform,
    public alertCtrl: AlertController,
    public callNumber: CallNumber
  ) {
    if(this.navParams.get('estabelecimento'))
      this.estabelecimento = this.navParams.get('estabelecimento');
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
    }
    
    if(this.platform.is('cordova') == true){
      this.linkLocalizacao = `geo:0,0?q=${this.latMarker},${this.lngMarker}(${this.estabelecimento.nome})`
    }

    else{
      this.linkLocalizacao = `https://www.google.com.br/maps/@${this.latMarker},${this.lngMarker},17.25z?hl=pt-BR`  
    }
  }
  ligar(estabelecimento){
    // Import the AlertController from ionic package 
    // Consume it in the constructor as 'alertCtrl' 
    let alert = this.alertCtrl.create({
      title: 'Ligar',
      message: `Deseja ligar para ${estabelecimento.nome}?`,
      buttons: [
        {
        text: 'Cancelar', role: 'cancel',
        handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Ok',
          handler: () => {
            if(this.platform.is('cordova'))
              this.callNumber.callNumber(estabelecimento.telefone,true);
            console.log('Ok clicked');
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstabelecimentoInfoPage');
  }

  clickMarker(){
    console.log('click marker');
    window.open(this.linkLocalizacao);
  }

}
