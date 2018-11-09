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
  searchbarVazio: boolean = true;
  estabelecimentosFiltrados: any[] = [];
  estabelecimentos: any[] = [];
  destaques: any[] = [];
  @ViewChild(Searchbar) searchbar: Searchbar;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public fire: FireProvider
  ) {
    this.fire.getEstabelecimentos()
      .then(estabelecimentos => {
        console.log('estabelecimentos antes do sort',estabelecimentos);
        let aux = estabelecimentos.sort((a,b) => {
          //console.log(a,b);
          return b.plano - a.plano;
        });
        console.log('estabelecimentos depois do sort',aux);
        this.estabelecimentosFiltrados = this.estabelecimentos = estabelecimentos;
      })
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    this.fire.getCategorias()
      .subscribe(categorias => {
        this.categorias = this.fire.snapshotParaValue(categorias);
        loading.dismiss();
      });
    this.fire.getDestaques()
      .then(destaques => {
        this.destaques = destaques;
      });
  }

  mudaSearchbar(event?: any) {
    this.searchbarLigado = !this.searchbarLigado;
    if (this.searchbarLigado)
      setTimeout(() => {
        this.searchbar.setFocus();
      }, 300);
  }

  abrirCategoria(categoria) {
    this.searchbarLigado = false;
    this.navCtrl.push('CategoriaPage', { categoria: categoria });
  }

  filtra(event?: Event) {
    console.log(this.estabelecimentosFiltrados);
    this.estabelecimentosFiltrados = this.estabelecimentos.filter(estabelecimento => {
      if (estabelecimento.tags) {
        let tags: string = '';
        estabelecimento.tags.map(tag => {
          tags = tags + tag;
        })
        return estabelecimento.nome.toUpperCase().includes(this.myInput.toUpperCase()) || tags.toUpperCase().includes(this.myInput.toUpperCase())
/*
        estabelecimento.tags.filter(tag => {
          console.log(estabelecimento, tag, tag.toUpperCase().includes(this.myInput.toUpperCase()))
          return tag.toUpperCase().includes(this.myInput.toUpperCase())
        });*/
      }

      else if (estabelecimento.nome) {
        console.log(estabelecimento);
        return estabelecimento.nome.toUpperCase().includes(this.myInput.toUpperCase())
      }
    });
    console.log(this.myInput, this.estabelecimentosFiltrados);
  }

  abrirEstabelecimento(estabelecimento) {
    this.searchbarLigado = false;
    this.myInput = '';
    this.navCtrl.push('EstabelecimentoPage', { estabelecimento: estabelecimento });
  }

  onClickDestaque(destaque){
    console.log(destaque);
  }

}
