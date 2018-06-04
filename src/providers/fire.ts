import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database/interfaces';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FireProvider {
  user: any;
  constructor(
    public db: AngularFireDatabase, 
    private afAuth: AngularFireAuth,
    public fb: Facebook,
    public platform: Platform
  ) {
  }

  getCategorias(): Observable<any>{
    return this.db.list('categorias').snapshotChanges();
  }

  getEstabelecimentos():Promise<any>{
    return this.db.list('estabelecimentos').snapshotChanges().first().toPromise()
              .then(snap => {
                return Promise.resolve(this.snapshotParaValue(snap))
              });
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
            .then(res => {
              console.log(res);
              this.updatePerfil();
            });
      }
    }
  
  linkUsuarios(email, senha):Promise<any>{
    return this.afAuth.auth.signInWithEmailAndPassword(email,senha)
      .then(user => {
        if(this.platform.is('cordova')){
          return this.fb.login(['email']).then(res => {
            let facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            return this.afAuth.auth.currentUser.linkWithCredential(facebookCredential)
                    .then(result => {
                      this.updatePerfil();
                      return Promise.resolve(this.afAuth.auth.currentUser);
                    })  
          })
        }
        else{
          return this.afAuth.auth.currentUser.linkWithRedirect(new firebase.auth.FacebookAuthProvider())
                    .then(result => {
                      this.updatePerfil();
                      return Promise.resolve(this.afAuth.auth.currentUser);
                    })  
        }
      })
  }

  updatePerfil(){
    console.log('update perfil')
    this.afAuth.auth.currentUser.providerData.map(provider => {
      if(provider.displayName && provider.photoURL)
        this.afAuth.auth.currentUser.updateProfile({displayName: provider.displayName, photoURL: provider.photoURL});
    })
  }
  signOut() {
    this.afAuth.auth.signOut();
  }
}
