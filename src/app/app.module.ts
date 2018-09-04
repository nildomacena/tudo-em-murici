//Angular Core
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


//Páginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


//Third-party libraries
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IonicImageLoader } from 'ionic-image-loader';

//Providers
import { FcmProvider } from '../providers/fcm';
import { FireProvider } from '../providers/fire';

//Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { Facebook } from '@ionic-native/facebook';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Push } from '@ionic-native/push';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { Firebase } from '@ionic-native/firebase';
import { FCM } from '@ionic-native/fcm';

const firebaseConfig = {
  apiKey: "AIzaSyBYUNHsD_X4yxr60N9Vjgb2kZSEQA3-Egs",
  authDomain: "tradegames-2dff6.firebaseapp.com",
  databaseURL: "https://tradegames-2dff6.firebaseio.com",
  projectId: "tradegames-2dff6",
  storageBucket: "tradegames-2dff6.appspot.com",
  messagingSenderId: "374168288805"
};

registerLocaleData(localePt);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicImageLoader.forRoot(),
    SuperTabsModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SocialSharing,
    SplashScreen,
    Facebook,
    CallNumber,
    Firebase,
    FcmProvider,
    ScreenOrientation,
    PhotoViewer,
    Push,
    FCM,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FireProvider,
    FcmProvider
  ]
})
export class AppModule { }
