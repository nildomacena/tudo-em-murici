import { FireProvider } from './../../providers/fire';
import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Searchbar } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categorias: any[] = [];
  searchbarLigado: boolean = false;
  myInput: string = '';
  searchbarVazio:boolean = true;
  estabelecimentosFiltrados: any[] = [];
  estabelecimentos: any[] = [];
  @ViewChild(Searchbar) searchbar: Searchbar;

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
      });
    this.fire.getEstabelecimentos()
      .then(estabelecimentos =>{ 
        this.estabelecimentos = estabelecimentos;
    })
  }

  mudaSearchbar(event?:any){
    this.searchbarLigado = !this.searchbarLigado;
    if(this.searchbarLigado)
      setTimeout(() => {
        this.searchbar.setFocus();    
      }, 300);
  }

  abrirCategoria(categoria){
    this.searchbarLigado = false;
    this.navCtrl.push('CategoriaPage',{categoria:categoria});
  }

  filtra(event?:Event){
    this.estabelecimentosFiltrados = this.estabelecimentos.filter(estabelecimento => estabelecimento.nome.toUpperCase().includes(this.myInput.toUpperCase()));
    console.log(this.myInput, this.estabelecimentosFiltrados);
  }

  abrirEstabelecimento(estabelecimento){
    this.searchbarLigado = false;
    this.myInput = '';
    this.navCtrl.push('EstabelecimentoPage',{estabelecimento:estabelecimento});
  }
  
}
