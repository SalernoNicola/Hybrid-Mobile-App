import { Component,ViewChild } from '@angular/core';
import { Platform,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';
import { FavouriteListPage } from '../pages/favourite-list/favourite-list';
import { AdvancedSearchPage } from '../pages/advanced-search/advanced-search';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BookingListPage } from '../pages/booking-list/booking-list';



export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

    this.initializeApp();

    this.appMenuItems = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Ricerca Avanzata', component: AdvancedSearchPage, icon: 'search' },      
      { title: 'Favoriti', component: FavouriteListPage,  icon: "star" },
      { title: 'Prenotazioni', component: BookingListPage, icon: 'create' },
      { title: 'LogOut', component: LoginPage, icon: 'log-out' },
    ];

  }
  
  initializeApp() {
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.overlaysWebView(true);  
      this.statusBar.backgroundColorByHexString("#000000");
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

