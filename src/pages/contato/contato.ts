import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {
  email: string;
  mensagem:string;
  telefone:string;
  nome:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fire:FireProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoPage');
  }

  enviar(){
    console.log(this.nome,this.email,this.telefone,this.mensagem);
    this.fire.enviarMensagem(this.nome,this.email,this.telefone,this.mensagem)
      .then(_ => {
        this.fire.toast('Mensagem enviada. Aguarde nosso contato.');
      })
  }
}
