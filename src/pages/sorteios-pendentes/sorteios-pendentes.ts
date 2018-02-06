import { SocialSharing } from '@ionic-native/social-sharing';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sorteios-pendentes',
  templateUrl: 'sorteios-pendentes.html',
})
export class SorteiosPendentesPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sharing: SocialSharing
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SorteiosPendentesPage');
  }

  share(){
    this.sharing.shareViaFacebookWithPasteMessageHint('testando compartilhamento', 'https://firebasestorage.googleapis.com/v0/b/tradegames-2dff6.appspot.com/o/marios.jpg?alt=media&token=1da808a6-d124-4a55-b1bf-0d8ebca3be42','', 'Cole a mensagem no campo de texto')
  }
}
