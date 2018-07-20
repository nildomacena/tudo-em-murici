import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { Facebook } from '@ionic-native/facebook';
import { ScreenOrientation }  from '@ionic-native/screen-orientation';
import { PhotoViewer }  from '@ionic-native/photo-viewer';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FireProvider } from '../providers/fire';
import { ElasticHeaderDirective } from '../directives/elastic-header/elastic-header';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { AgmCoreModule } from '@agm/core';
import { FcmProvider } from '../providers/fcm';
import { Firebase } from '@ionic-native/firebase';
import { Push } from '@ionic-native/push';
  
const firebaseConfig = {
  apiKey: "AIzaSyBYUNHsD_X4yxr60N9Vjgb2kZSEQA3-Egs",
  authDomain: "tradegames-2dff6.firebaseapp.com",
  databaseURL: "https://tradegames-2dff6.firebaseio.com",
  projectId: "tradegames-2dff6",
  storageBucket: "tradegames-2dff6.appspot.com",
  messagingSenderId: "374168288805"
};


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
    Push,
    ScreenOrientation,
    PhotoViewer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireProvider,
    FcmProvider
  ]
})
export class AppModule {}
