import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from './../providers/fcm';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AngularFireAuth } from 'angularfire2/auth';
import { FireProvider } from './../providers/fire';
import { Component, ViewChild } from '@angular/core';
import { Nav, Menu, App, Platform, ActionSheet, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Push } from '@ionic-native/push';
import { tap } from '../../node_modules/rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Menu) menu: Menu;
  user: any;
  rootPage: any = HomePage;
  menuOpen: boolean = false;

  pages: Array<{ title: string, component: any, icon?: string }>;

  constructor(
    public platform: Platform,
    public app: App,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public fire: FireProvider,
    public afAuth: AngularFireAuth,
    public orientation: ScreenOrientation,
    public fcm: FcmProvider,
    public firebase: Firebase,
    public push: Push,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user);
    })
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Início', component: HomePage, icon: 'home' },
      { title: 'Sorteios', component: 'SorteiosPage', icon: 'logo-usd' }
    ];
  }

  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.firebase.subscribe('sorteios')
          .then(_ => {
            console.log('inscrita no tópico sorteios');
          });
        this.firebase.onNotificationOpen().subscribe(notification => {
          console.log(notification);
          let alert = this.alertCtrl.create({
            title: notification.titulo,
            message: notification.texto,
            buttons: [
              {
                text: 'Inscrever',
                handler: () => {
                  this.nav.push('SorteiosPage');
                }
              },
              {
                text: 'Cancelar',
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
        this.orientation.lock(this.orientation.ORIENTATIONS.PORTRAIT);

      }
    });

    this.platform.registerBackButtonAction(_ => {
      console.log(this.nav.getActive().instance.sheetAtivo);
      if (this.menuOpen)
        this.menu.close();
      else if (this.nav.getActive().instance.sheetAtivo) {
        this.nav.getActive().instance.actionSheet.dismiss();
      }
      else if (this.nav.length() == 1 && this.nav.getActive().instance.searchbarLigado) {
        this.nav.getActive().instance.searchbarLigado = false;
      }
      else if (this.nav.length() > 1) {
        this.nav.pop();
      }
      else {
        this.platform.exitApp();
      }
    }, )
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  toggleMenu(open) {
    this.menuOpen = open;
  }

  login() {
    this.fire.signInWithFacebook()
      .then(user => {
        this.user = user;
      })
      .catch(err => {
        console.error(err);
        if (err.code == 'auth/account-exists-with-different-credential') {
          let alert = this.alertCtrl.create({
            title: 'Email já utilizado',
            message: `O email ${err.email} já foi utilizado para fazer login através do sistema WEB. Digite a senha utilizada`,
            inputs: [
              {
                name: 'senha',
                placeholder: 'Digite a senha',
                type: 'password'
              }
            ],
            buttons: [
              {
                text: 'Cancelar', role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }, {
                text: 'Ok',
                handler: () => {
                  console.log('Ok clicked');
                }
              }
            ]
          });
          alert.present();
          alert.onDidDismiss(data => {
            console.log(data);
            this.fire.linkUsuarios(err.email, data.senha)
              .then(result => {
                console.log(result);
                console.log(this.afAuth.auth.currentUser);
              })
              .catch(err => {
                console.log(err);
                this.fire.signOut();
              })
          })
        }
      })
  }

  logout() {
    this.fire.signOut();
    this.user = null;
  }
}
