import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {
  categoria: any;
  estabelecimentos: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FireProvider
  ) {
    this.categoria = this.navParams.get('categoria');
    !this.categoria? this.navCtrl.popToRoot(): '';

    this.fire.getEstabelecimentosPorCategoria(this.categoria)
      .subscribe(estabelecimentos => {
        this.estabelecimentos = this.fire.snapshotParaValue(estabelecimentos)
        console.log(estabelecimentos);
        console.log(this.estabelecimentos)
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriaPage');
  }

}
