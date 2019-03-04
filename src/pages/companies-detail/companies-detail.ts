import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController,ActionSheet, NavParams,ToastController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { BookingTwoStepPage } from '../booking-two-step/booking-two-step';

/**
 * Generated class for the CompaniesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-companies-detail',
  templateUrl: 'companies-detail.html',
})
export class CompaniesDetailPage {
  item: any;
  img: Array<any>;
  constructor(public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public firebaseProvider: FirebaseProvider) {
    this.item = this.navParams.data;
    this.img=this.item.img;
    console.log(this.img);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CompaniesDetailPage');
  }

  favorite(property) {
    this.firebaseProvider.favorite(property)
        .then(property => {
            let toast = this.toastCtrl.create({
                message: 'Azienda aggiunta nei favoriti',
                cssClass: 'mytoast',
                duration: 1000
            });
            toast.present(toast);
        });
}

booking(property) {
    console.log("ciao");
    this.navCtrl.push(BookingTwoStepPage, property);
}
}
