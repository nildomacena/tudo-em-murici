import { FireProvider } from './../../providers/fire';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categorias: any[] = [];
  searchbarLigado: boolean = false;
  myInput: string = '';

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public fire: FireProvider
  ) {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    this.fire.getCategorias()
      .subscribe(categorias => {
        this.categorias = this.fire.snapshotParaValue(categorias);
        loading.dismiss();
      })
  }

  mudaSearchbar(event?:any){
    console.log(event);
    this.searchbarLigado = !this.searchbarLigado;
  }
  abrirCategoria(categoria){
    this.searchbarLigado = false;
    this.navCtrl.push('CategoriaPage',{categoria:categoria});
    console.log(categoria);
  }

  onInput(event?:any){
    console.log(this.myInput, event);
  }
}
