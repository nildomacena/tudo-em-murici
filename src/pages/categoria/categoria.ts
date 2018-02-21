import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, ActionSheet } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ActionSheetController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {
  categoria: any;
  estabelecimentos: any[] = [];
  actionSheet: ActionSheet;
  sheetAtivo: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireProvider,
    public actionCtrl: ActionSheetController,
    public callNumber: CallNumber,
    public alertCtrl: AlertController,
    public platform: Platform,
    public photoViewer: PhotoViewer
  ) {
    this.categoria = this.navParams.get('categoria');
    !this.categoria? this.navCtrl.setRoot(HomePage): '';
    if(this.categoria)
      this.fire.getEstabelecimentosPorCategoria(this.categoria)
        .subscribe(estabelecimentos => {
          this.estabelecimentos = this.fire.snapshotParaValue(estabelecimentos)
        })
  }

  ionViewDidLoad() {
  }

  more(estabelecimento){
    this.actionSheet = this.actionCtrl.create({
      title: `${estabelecimento.nome}`,
      buttons: [
        {
          icon: 'call',
          text: 'Ligar',
          handler: () => {
           this.ligar(estabelecimento)
          }
        },{
          icon: 'map',
          text: 'Mapa',
          handler: () => {
            this.abrirMapa(estabelecimento);
          }
        },{
          icon: 'close',
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    this.actionSheet.present();
    this.actionSheet.didEnter.subscribe(_ => {
      this.sheetAtivo = true;
    });

    this.actionSheet.didLeave.subscribe(_ => {
      this.sheetAtivo = false;
    })
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

  abrirFoto(foto,titulo){
    //this.photoViewer.show(foto, '');
  }

  abrirMapa(estabelecimento){
    let latLng = `${estabelecimento.coords.lat},${estabelecimento.coords.lng}`
    let linkLocalizacao = this.platform.is('cordova')? 'geo:0,0?q=' + latLng + '(' + estabelecimento.nome + ')': "https://www.google.com.br/maps/@"+latLng +",15z?hl=pt-BR";
    window.open(linkLocalizacao);
  }

  abrirEstabelecimento(estabelecimento){
    this.navCtrl.push('EstabelecimentoPage',{estabelecimento:estabelecimento});
  }

}
