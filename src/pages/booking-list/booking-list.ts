import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';
import {PassPage} from '../pass/pass';



@IonicPage()
@Component({
  selector: 'page-booking-list',
  templateUrl: 'booking-list.html',
})

export class BookingListPage {
  booking: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public firebaseProvider: FirebaseProvider) {
    console.log("hso");    
    this.booking = this.firebaseProvider.getBooking();
    console.log("sadsdf"+this.booking);
    
  }

 
  openPassPage(item) {
    this.navCtrl.push(PassPage, item);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingListPage');
  }

}
