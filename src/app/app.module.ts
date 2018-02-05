import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { NoteService } from './note.service';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';

export const firebaseConfig = {
  apiKey: "AIzaSyDEy2Tj-pSPC2F5RiqXgIM2dKZgIRr3mr0",
  authDomain: "blocodenotas-a3df0.firebaseapp.com",
  databaseURL: "https://blocodenotas-a3df0.firebaseio.com",
  projectId: "blocodenotas-a3df0",
  storageBucket: "",
  messagingSenderId: "412786282751"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    LoginPage,
    SignupPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NoteService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
