import { FireProvider } from './../../providers/fire';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sorteios-pendentes',
  templateUrl: 'sorteios-pendentes.html',
})
export class SorteiosPendentesPage {
  sorteios: any[];
  user: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sharing: SocialSharing,
    public alertCtrl: AlertController,
    public fire: FireProvider,
    public loadingCtrl: LoadingController
  ) {
   
  }
  
  ionViewDidLoad() {
    setTimeout(() => {
      this.user = this.fire.user;
    }, 1000);
    this.getSorteiosPendentes();
    console.log('ionViewDidLoad SorteiosPendentesPage');
  }

  getSorteiosPendentes(){
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    this.fire.getSorteiosPendentes()
      .then(sorteios => {
        this.sorteios = sorteios;
        if(this.sorteios.length > 0){
          this.sorteios.map(sorteio => {
            if(sorteio.participantes){
              Object.keys(sorteio.participantes).map(key => {
                console.log(sorteio.participantes.key);
                if(sorteio.participantes[key].uid == this.fire.user.uid)
                  sorteio['participando'] = true;
                });
              }
            });
          }
          loading.dismiss();
          console.log(sorteios);
      });
  }
  share(sorteio){
    window.open(sorteio.linkInstagram, 'blank')
    //this.sharing.shareViaFacebookWithPasteMessageHint('testando compartilhamento', 'https://firebasestorage.googleapis.com/v0/b/tradegames-2dff6.appspot.com/o/marios.jpg?alt=media&token=1da808a6-d124-4a55-b1bf-0d8ebca3be42','', 'Cole a mensagem no campo de texto')
  }

  participar(sorteio){
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Lembre-se que é necessário cumprir todos os requisitos para estar apto a participar da promoção, inclusive o compartilhamento nas redes sociais!',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.fire.participarSorteio(sorteio.key)
              .then(_ => {
                this.fire.toast('Parabéns! Você já está participando do sorteio! Agora é só aguardar.');
                this.getSorteiosPendentes();
              })
          }
        }
      ]
    });
    alert.present();
  }
}
