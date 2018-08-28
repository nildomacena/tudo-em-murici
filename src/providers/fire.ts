import { Firebase } from '@ionic-native/firebase';
import { Platform, ToastController } from 'ionic-angular';
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
  public user: any;
  constructor(
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public fb: Facebook,
    public firebase: Firebase,
    public platform: Platform,
    public toastCtrl: ToastController
  ) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    })
  }

  getCategorias(): Observable<any> {
    return this.db.list('categorias', ref => ref.orderByChild('estabelecimentos').equalTo(true)).snapshotChanges();
  }

  getEstabelecimentos(): Promise<any> {
    return this.db.list('estabelecimentos').snapshotChanges().first().toPromise()
      .then(snap => {
        return Promise.resolve(this.snapshotParaValue(snap))
      });
  }
  getEstabelecimentosPorCategoria(categoria): Observable<any> {
    console.log(categoria.key + "+_true");
    return this.db.list('estabelecimentos', ref => ref.orderByChild('categoriaAtivo').equalTo(categoria.key + "_true")).snapshotChanges();
  }

  getEstabelecimentoPorKey(key):Promise<any>{
    return this.db.object(`estabelecimentos/${key}`).snapshotChanges().first().toPromise()
      .then(snapshot => {
        console.log('snapshot estabelecimento',snapshot.payload.val());
        return Promise.resolve(snapshot.payload.val());
      })
  }

  getSorteiosPendentes(): Promise<any> {
    return this.db.list('sorteios', ref => ref.orderByChild('pendente').equalTo(true)).snapshotChanges().first().toPromise()
      .then(snap => {
        return this.snapshotParaValue(snap);
      })
  }

  getSorteiosRealizados(): Promise<any> {
    return this.db.list('sorteios', ref => ref.orderByChild('pendente').equalTo(false)).snapshotChanges().first().toPromise()
      .then(snap => {
        return this.snapshotParaValue(snap);
      })
  }

  participarSorteio(key) {
    return this.db.list(`sorteios/${key}/participantes`).push({ uid: this.afAuth.auth.currentUser.uid, nome: this.afAuth.auth.currentUser.displayName })
      .then(value => {
        console.log(value);
        return this.firebase.subscribe(value.key);
      })
  }

  snapshotParaValue(lista: AngularFireAction<DatabaseSnapshot>[]) {
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

  signInWithFacebook(): Promise<any> {
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

  linkUsuarios(email, senha): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(user => {
        if (this.platform.is('cordova')) {
          return this.fb.login(['email']).then(res => {
            let facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            return this.afAuth.auth.currentUser.linkWithCredential(facebookCredential)
              .then(result => {
                this.updatePerfil();
                return Promise.resolve(this.afAuth.auth.currentUser);
              })
          })
        }
        else {
          return this.afAuth.auth.currentUser.linkWithRedirect(new firebase.auth.FacebookAuthProvider())
            .then(result => {
              this.updatePerfil();
              return Promise.resolve(this.afAuth.auth.currentUser);
            })
        }
      })
  }

  updatePerfil() {
    console.log('update perfil')
    this.afAuth.auth.currentUser.providerData.map(provider => {
      if (provider.displayName && provider.photoURL)
        this.afAuth.auth.currentUser.updateProfile({ displayName: provider.displayName, photoURL: provider.photoURL });
    })
  }
  signOut() {
    this.afAuth.auth.signOut();
  }


  toast(message: string) {
    let toast = this.toastCtrl.create({ message: message, duration: 2500 });
    toast.present();

  }
}
