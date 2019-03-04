import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CompaniesDetailPage} from '../pages/companies-detail/companies-detail';
import { FavouriteListPage } from '../pages/favourite-list/favourite-list';
import { BookingPage } from '../pages/booking/booking';
import { BookingListPage } from '../pages/booking-list/booking-list';
import { PassPage } from '../pages/pass/pass';
import { LoginPage } from '../pages/login/login';
import { AdvancedSearchPage } from '../pages/advanced-search/advanced-search';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { CardIO } from '@ionic-native/card-io';
import { TextMaskModule } from 'angular2-text-mask';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { BookingTwoStepPage } from '../pages/booking-two-step/booking-two-step';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { Keyboard } from '@ionic-native/keyboard';
import { Diagnostic } from '@ionic-native/diagnostic';



export const firebaseConfig = {
  apiKey: "AIzaSyDWtL3vla-wHxn3E_4dXaL3vUWmJMwjK2g",
  authDomain: "jace-312b3.firebaseapp.com",
  databaseURL: "https://jace-312b3.firebaseio.com",
  projectId: "jace-312b3",
  storageBucket: "jace-312b3.appspot.com",
  messagingSenderId: "654350017175"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CompaniesDetailPage,
    FavouriteListPage,
    BookingPage,
    BookingListPage,
    PassPage,
    AdvancedSearchPage,
    BookingTwoStepPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrMaskerModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    FormsModule,
    TextMaskModule,
    HttpClientModule  
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    CompaniesDetailPage,
    FavouriteListPage,
    BookingPage,
    BookingListPage,
    PassPage,
    AdvancedSearchPage,
    BookingTwoStepPage
  ],
  providers: [
    Diagnostic,
    Keyboard,
    Geolocation,
    StatusBar,
    SplashScreen,
    FirebaseProvider,
    CardIO,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}