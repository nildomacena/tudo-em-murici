import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import { AngularFireAction, DatabaseSnapshot } from 'angularfire2/database/interfaces';

@Injectable()
export class FireProvider {
  
  constructor(public db: AngularFireDatabase) {
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
  
}
