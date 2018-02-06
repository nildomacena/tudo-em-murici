import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class FireProvider {
  user: any;
  constructor(
    public db: AngularFireDatabase, 
    private afAuth: AngularFireAuth,
    public fb: Facebook,
    public platform: Platform
  ) {
    console.log('Hello FireProvider Provider');
  }

  getCategorias(): Observable<any>{
    return this.db.list('categorias').snapshotChanges();
  }

  getEstabelecimentosPorCategoria(categoria): Observable<any>{
    return this.db.list('estabelecimentos', ref => ref.orderByChild('categoria').equalTo(categoria.key)).snapshotChanges();
  }

  snapshotParaValue(lista: AngularFireAction<DatabaseSnapshot>[]){
    let novaLista = [];
    lista.map(objeto => {
      let novoObjeto = {};
      novoObjeto['key'] = objeto.key;
      let val = objeto.payload.val();
      Object.keys(val).map(key => {
        novoObjeto[key] = val[key]
      });
      novaLista.push(novoObjeto);
    });
    return novaLista;
  }
  
  signInWithFacebook(): Promise<any>{
    if (this.platform.is('cordova')) {
        return this.fb.login(['email']).then(res => {
          let facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          return firebase.auth().signInWithCredential(facebookCredential);
        })
      }
      else {
        return this.afAuth.auth
          .signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then(res => console.log(res));
      }
    }
  

  signOut() {
    this.afAuth.auth.signOut();
  }
}
