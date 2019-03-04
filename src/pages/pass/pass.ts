import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pass',
  templateUrl: 'pass.html',
})
export class PassPage {
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.data;
    console.log("sadsad"+this.item.gaming)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassPage');
  }

}
