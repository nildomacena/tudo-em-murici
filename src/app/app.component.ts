import { AngularFireAuth } from 'angularfire2/auth';
import { FireProvider } from './../providers/fire';
import { Component, ViewChild } from '@angular/core';
import { Nav, Menu, App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Menu) menu: Menu;
  user: any;
  rootPage: any = HomePage;
  menuOpen: boolean = false;

  pages: Array<{title: string, component: any, icon?: string}>;

  constructor(
    public platform: Platform, 
    public app: App,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public fire: FireProvider,
    public afAuth: AngularFireAuth
  ) {
    this.initializeApp();
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(user);
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
    });
    
    this.platform.registerBackButtonAction( _ => {
      console.log('menu',this.menu);
      if(this.menuOpen)
        this.menu.close();
        
      else if(this.nav.length() == 1 && this.nav.getActive().instance.searchbarLigado){
        this.nav.getActive().instance.searchbarLigado = false;
      }
      else if(this.nav.length() > 1){
        this.nav.pop();
      }
      else{
        this.platform.exitApp();
      }
    },)
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  toggleMenu(open){
    this.menuOpen = open;
    console.log('menu open? ',this.menuOpen)
  }
  
  login(){
    this.fire.signInWithFacebook()
      .then(user => {
        this.user = user;
      })
  }

  logout(){
   this.fire.signOut();
   this.user = null;
  }
}
