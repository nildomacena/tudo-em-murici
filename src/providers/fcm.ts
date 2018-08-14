import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';

@Injectable()
export class FcmProvider {

  constructor(
    public firebase: Firebase,
    public db: AngularFireDatabase,
    public platform: Platform
  ) {
    console.log('Hello FcmProvider Provider');
  }

  async getToken(){
    let token;
    if(this.platform.is('android')){
      token = await this.firebase.getToken();
    }
    if(this.platform.is('ios')){
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    if(!this.platform.is('cordova')){
      //Implementar quando for um PWA
    }
    return this.salvaToken(token);
  }

  salvaToken(token){
    if(!token)
      return;
    const deviceRef = this.db.list('devices');
    return deviceRef.push(token);
  }

  ouvirNotificacoes(){
    return this.firebase.onNotificationOpen();
  }
}
