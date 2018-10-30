import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-oferta-detail',
  templateUrl: 'oferta-detail.html',
})
export class OfertaDetailPage {
  oferta: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.oferta = this.navParams.get('oferta');
    if(!this.navParams.get('oferta'))
    this.oferta = {
      key: "-LQ4nO7-Bzl0ss9ougtG",
      descricao: "Passaporte de frango, verdura e salsicha",
      imagem: "https://storage.googleapis.com/tradegames-2dff6.appspot.com/ofertas%2F-LPaYDk4qFzrjd9ScEw3%2F-LQ4nO7-Bzl0ss9ougtG%2Fimagem.jpg?GoogleAccessId=firebase-adminsdk-2zdli%40tradegames-2dff6.iam.gserviceaccount.com&Expires=16447017600&Signature=xTU7WltjempRkrZ29bhFO%2FBJe8pqZf1%2F3Y6aVK%2BmpL2co8Zftiidj%2BvrYiNMrtesB%2Fti0d0mOVCim5OkEvf%2F8EcsEiEDTN%2FjVsvPWTRm8gJGXzEMeuB9OvUlmyNQkWy0OC4bw4NHhDo76mTmNJigidF5oi6skCzUsFInGlNk%2BNVXixj6%2Bj6Aw%2FJYePS5fTzDOgVMBgWkNVW6V2Q5quj8JcxFQ6vHpmHzi9Pnk1ZJqNQSeQa%2FJ8LA%2Bj33MpwsObR6GEx9vzoqYT04BNp8QVvh4%2FcbFECsy0LPjkF0emN2KzUa0kItfJXQPRh3iJ21ASB9j6ZU9vdLEvMuD2fbT4nFzQ%3D%3D",
      nome: "Passaporte", 
      preco: "R$12,00"
    }
    console.log(this.oferta);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfertaDetailPage');
  }
  
  abrirOfertas(){
    this.navCtrl.pop();
  }

}
