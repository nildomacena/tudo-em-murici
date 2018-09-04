import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CallNumber } from '@ionic-native/call-number';
import { PhotoViewer } from '@ionic-native/photo-viewer';


@IonicPage()
@Component({
  selector: 'page-estabelecimento',
  templateUrl: 'estabelecimento.html',
})
export class EstabelecimentoPage {
  estabelecimento: any;
  photo: string;
  linkLocalizacao: string;
  estabelecimentoKey:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public alertCtrl: AlertController,
    public callNumber: CallNumber,
    public photoViewer: PhotoViewer,
    public fire: FireProvider
  ) {

    this.estabelecimento = this.navParams.get('estabelecimento');

    if(this.estabelecimento){
      this.estabelecimento.avatar? this.photo = this.estabelecimento.avatar : this.photo = 'http://www.guiachef.com.br/wp-content/uploads/2015/06/padaria.jpg';
      if(this.estabelecimento.coords){
        let latLng = this.estabelecimento.coords.lat + ','+ this.estabelecimento.coords.lng;
        this.linkLocalizacao = this.platform.is('cordova')? 'geo:0,0?q=' + latLng + '(' + this.estabelecimento.nome + ')': "https://www.google.com.br/maps/@"+latLng +",15z?hl=pt-BR";
      }
    }

    else if(!this.estabelecimento){
      this.navCtrl.setRoot(HomePage);
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
    //this.photo = this.estabelecimento.avatar
  }
  ligar(telefone){
    // Import the AlertController from ionic package 
    // Consume it in the constructor as 'alertCtrl' 
    let alert = this.alertCtrl.create({
      title: 'Ligar',
      message: `Deseja ligar para ${this.estabelecimento.nome}?`,
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
              this.callNumber.callNumber(telefone,true);
            console.log('Ok clicked');
          }
        }
      ]
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EstabelecimentoPage');
  }

  abrirFoto(foto){
    console.log('abrirFoto');
    //this.photoViewer.show(foto);
  }

  abrirMapa(){
    let latLng = `${this.estabelecimento.coords.lat},${this.estabelecimento.coords.lng}`
    window.open(this.linkLocalizacao);
  }

  onImageLoad(event){
    console.log('image load', event);
  }
  verMais(){
    this.navCtrl.push('EstabelecimentoInfoPage',{estabelecimento: this.estabelecimento})
  }

}

